// This data file should export all functions using the ES6 standard as shown in the lecture code

import { ObjectId } from "mongodb";
import { bands } from "../config/mongoCollections.js";
import { checkNonEmptyStrArr, isID, isString, checkDate } from "../helpers.js";
import { bandData } from "./index.js";
/**
 * todo: Check rating logic from slack
 *
 */
const create = async (bandId, title, releaseDate, tracks, rating) => {
  try {
    bandId = isID(bandId);
  } catch (e) {
    throw e;
  }

  try {
    title = isString("Album title", title);
  } catch (error) {
    throw e;
  }

  try {
    releaseDate = checkDate("releaseDate", releaseDate);
  } catch (error) {
    throw error;
  }

  try {
    tracks = checkNonEmptyStrArr("tracks", tracks);
  } catch (error) {
    throw error;
  }

  if (typeof rating !== "number" || isNaN(rating))
    throw new Error("Improper Album Rating");

  if (rating < 1 || rating > 5) throw new Error("Improper Album Rating");

  const bandsCol = await bands();
  let bandObj;
  try {
    bandObj = await bandData.get(bandId);
  } catch (error) {
    throw error;
  }
  let overallRating = rating;
  if (bandObj["albums"].length > 0) {
    for (let album of bandObj["albums"]) {
      //console.log(overallRating);
      overallRating = overallRating + album["rating"];
    }
    // console.log(overallRating);
    overallRating = overallRating / (bandObj["albums"].length + 1);
  }

  overallRating =
    Math.trunc(overallRating) + Math.floor((overallRating % 1) * 10) / 10;

  let newAlbumId = new ObjectId();
  let updatedBand = await bandsCol.findOneAndUpdate(
    { _id: new ObjectId(bandId) },
    {
      $set: { overallRating },
      $push: {
        albums: { _id: newAlbumId, title, releaseDate, tracks, rating },
      },
    },
    { returnDocument: "after" }
  );

  if (updatedBand.lastErrorObject.n === 0) throw new Error("Failed to Update");

  let newAlbumObj;
  for (let albumObj of updatedBand.value.albums)
    if (albumObj._id.toString() === newAlbumId.toString())
      newAlbumObj = albumObj;

  newAlbumObj._id = newAlbumObj._id.toString();

  return newAlbumObj;
};

const getAllAlbums = async () => {
  let finalAlbumsList = [];
  let allBands = await bandData.getAll();

  if (allBands.length === 0) return finalAlbumsList;

  for (let band of allBands) {
    if (band.albums.length < 1) continue;
    band["albums"].forEach((element) => {
      element["bandid"] = band._id;
    });
    finalAlbumsList.push(...band.albums);
  }

  finalAlbumsList = finalAlbumsList.sort((a, b) => {
    if (a._id > b._id) return 1;
    else if (a._id < b._id) return -1;
    else 0;
  });

  return finalAlbumsList;
};

const getAll = async (bandId) => {
  try {
    bandId = isID(bandId);
  } catch (e) {
    throw e;
  }
  let bandDetails;
  try {
    bandDetails = await bandData.get(bandId);
    bandDetails = bandDetails["albums"];
  } catch (error) {
    throw error;
  }

  return bandDetails;
};

const get = async (albumId) => {
  try {
    albumId = isID(albumId);
  } catch (error) {
    throw error;
  }

  let albumsAll = await getAllAlbums();

  if (albumsAll.length === 0) throw new Error("Album not Found");

  let albumObj = albumsAll.find(({ _id }) => {
    return _id === albumId;
  });

  if (!albumObj) throw new Error("Album Not Found");

  delete albumObj.bandid;

  return albumObj;
};

const remove = async (albumId) => {
  try {
    albumId = isID(albumId);
  } catch (error) {
    throw Error;
  }

  let bandCol = await bands();
  let albumsAll = await getAllAlbums();

  let albumObj = albumsAll.find(({ _id }) => {
    return _id === albumId;
  });

  if (!albumObj) throw new Error("Album Not Found");

  const updatedBand = await bandCol.findOneAndUpdate(
    { _id: new ObjectId(albumObj.bandid) },
    {
      $set: {
        overallRating: 1,
      },
      $pull: {
        albums: { _id: new ObjectId(albumObj._id) },
      },
    },
    { returnDocument: "after" }
  );

  if (updatedBand.lastErrorObject.n === 0) throw new Error("Failed to Update");

  updatedBand["value"]["_id"] = updatedBand["value"]["_id"].toString();

  return updatedBand["value"];
};

export default { create, get, getAll, remove, getAllAlbums };
