// This data file should export all functions using the ES6 standard as shown in the lecture code

import { ObjectId } from "mongodb";
import { bands } from "../config/mongoCollections.js";
import {
  checkNonEmptyStrArr,
  isID,
  isString,
  checkDate,
  getDecimalPlaces,
} from "../helpers.js";

const getBand = async (id) => {
  id = isID(id);

  const bandsCol = await bands();

  let bandDetail = await bandsCol.findOne({
    _id: new ObjectId(id),
  });

  if (!bandDetail) throw new Error(`No Band for id:'${id}'`);

  bandDetail["_id"] = bandDetail["_id"].toString();
  bandsCol.close;

  if (bandDetail.albums.length > 0) {
    for (let i = 0; i < bandDetail.albums.length; i++) {
      bandDetail.albums[i]._id = bandDetail.albums[i]._id.toString();
    }
  }

  return bandDetail;
};

const create = async (bandId, title, releaseDate, tracks, rating) => {
  bandId = isID(bandId);
  title = isString("Album title", title);
  releaseDate = checkDate("releaseDate", releaseDate);
  tracks = checkNonEmptyStrArr("tracks", tracks, 3);

  if (typeof rating !== "number" || isNaN(rating))
    throw new Error("Improper Album Rating");

  if (rating < 1 || rating > 5 || getDecimalPlaces("Album Rating", rating) > 1)
    throw new Error("Improper Album Rating");

  const bandsCol = await bands();
  let bandObj;
  try {
    bandObj = await getBand(bandId);
  } catch (error) {
    throw error;
  }
  let overallRating = rating;
  if (bandObj["albums"].length > 0) {
    for (let album of bandObj["albums"]) {
      overallRating = overallRating + album["rating"];
    }
    overallRating = overallRating / (bandObj["albums"].length + 1);
  }

  overallRating = Number(overallRating.toFixed(1));

  let newAlbumId = new ObjectId();

  let updatedBand = await bandsCol.findOneAndUpdate(
    {
      _id: new ObjectId(bandId),
      albums: {
        //check if object already exists in database, if it does don't update it
        $not: {
          $elemMatch: {
            title,
            releaseDate,
          },
        },
      },
    },
    {
      $addToSet: {
        albums: { _id: newAlbumId, title, releaseDate, tracks, rating },
      },
      $set: { overallRating },
    },
    { returnDocument: "after" }
  );

  if (updatedBand.lastErrorObject.n === 0) throw new Error("Failed to Add");

  let newAlbumObj;
  for (let albumObj of updatedBand.value.albums)
    if (albumObj._id.toString() === newAlbumId.toString())
      newAlbumObj = albumObj;

  newAlbumObj._id = newAlbumObj._id.toString();

  return newAlbumObj;
};

const getAll = async (bandId) => {
  bandId = isID(bandId);

  let bandDetails;
  try {
    bandDetails = await getBand(bandId);
    bandDetails = bandDetails["albums"];
  } catch (error) {
    throw error;
  }

  return bandDetails;
};

const get = async (albumId) => {
  albumId = isID(albumId);

  let bandsCol = await bands();

  let albumObj = await bandsCol.findOne(
    {
      "albums._id": new ObjectId(albumId),
    },
    {
      projection: {
        _id: 0,
        albums: { $elemMatch: { _id: new ObjectId(albumId) } },
      },
    }
  );

  if (!albumObj) throw new Error("Album Not Found");
  albumObj = albumObj.albums[0];

  albumObj._id = albumObj._id.toString();

  return albumObj;
};

const remove = async (albumId) => {
  albumId = isID(albumId);

  let bandsCol = await bands();

  let albumObj = await bandsCol.findOne(
    {
      "albums._id": new ObjectId(albumId),
    },
    { projection: { _id: 1 } }
  );

  if (!albumObj) throw new Error("Album Not Found");

  const updatedBandInfo = await bandsCol.updateOne(
    { _id: albumObj._id },
    {
      $pull: { albums: { _id: new ObjectId(albumId) } },
    }
  );

  if (!updatedBandInfo.acknowledged || updatedBandInfo.modifiedCount !== 1)
    throw new Error("Failed to Pull Band");

  let updateBandRating = await bandsCol.findOneAndUpdate(
    { _id: albumObj._id },
    [
      {
        $set: {
          overallRating: {
            $round: [{ $ifNull: [{ $avg: "$albums.rating" }, 0] }, 1],
          },
        },
      },
    ],
    {
      returnDocument: "after",
    }
  );

  if (updateBandRating.lastErrorObject.n !== 1)
    throw new Error("Failed to Update Rating");

  updateBandRating = updateBandRating.value;
  updateBandRating._id = updateBandRating._id.toString();
  if (updateBandRating.albums.length > 0) {
    for (let i = 0; i < updateBandRating.albums.length; i++) {
      updateBandRating.albums[i]._id =
        updateBandRating.albums[i]._id.toString();
    }
  }
  return updateBandRating;
};

export default { create, get, getAll, remove };
