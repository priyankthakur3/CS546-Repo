// This data file should export all functions using the ES6 standard as shown in the lecture code

import { ObjectId } from "mongodb";
import { bands } from "../config/mongoCollections.js";
import { checkNonEmptyStrArr, isID, isString } from "../helpers.js";
import * as band from "./bands.js";

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

  if (typeof releaseDate !== "number" || isNaN(releaseDate))
    throw new Error("Expected Album Release Date to be Number");

  if (releaseDate < 1900 || releaseDate > new Date().getFullYear() + 1)
    throw new Error("Improper Album release Date");

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
    bandObj = await band.get(bandId);
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

const getAll = async (bandId) => {
  try {
    bandId = isID(bandId);
  } catch (e) {
    throw e;
  }

  try {
    const bandDetails = await band.get(bandId);
  } catch (error) {
    throw error;
  }

  return bandDetails["album"].toArray();
};

const get = async (albumId) => {
  /**
   * !todo: Convert to nlogn complexity
   */
  try {
    albumId = isID(albumId);
  } catch (error) {
    throw error;
  }
  let allBands = await band.getAll();
  let albumObj;
  for (let bandElm of allBands) {
    for (let albumBand of bandElm["albums"])
      if (albumBand._id.toString() === albumId) {
        albumObj = albumBand;
        break;
      }
    if (albumObj) break;
  }
  if (!albumObj) throw new Error("Album Not Found");

  albumObj._id = albumObj._id.toString();
  return albumObj;
};

const remove = async (albumId) => {
  try {
    albumId = isID(albumId);
  } catch (error) {
    throw Error;
  }

  let bandCol = await bands();
  let allBands = await band.getAll();
  let albumID;
  let bandID;
  for (let bandElm of allBands) {
    for (let albumBand of bandElm["albums"])
      if (albumBand._id.toString() === albumId) {
        albumID = albumBand._id.toString();
        bandID = bandElm._id;
        break;
      }
    if (albumID) break;
  }

  if (!albumID || !bandID) throw new Error(`Unable to find Band`);

  console.log(albumID, bandID);
  const updatedBand = await bandCol.findOneAndUpdate(
    { _id: new ObjectId(bandID) },
    {
      $set: {
        overallRating: 1,
      },
      $pull: {
        albums: { _id: new ObjectId(albumID) },
      },
    },
    { returnDocument: "after" }
  );

  if (updatedBand.lastErrorObject.n === 0) throw new Error("Failed to Update");

  updatedBand["value"]["_id"] = updatedBand["value"]["_id"].toString();

  return updatedBand["value"];
};

export { create, get, getAll, remove };
