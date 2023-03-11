// This data file should export all functions using the ES6 standard as shown in the lecture code

import { ObjectId } from "mongodb";
import { bands } from "../config/mongoCollections.js";
import { checkNonEmptyStrArr, isID, isString, checkDate } from "../helpers.js";
import { bandData } from "./index.js";
/**
 * !todo: checkrelease data format2
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
  /**
   * !todo: Convert to nlogn complexity
   */
  try {
    albumId = isID(albumId);
  } catch (error) {
    throw error;
  }
  let allBands = await bandData.getAll();
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
  let allBands = await bandData.getAll();
  let albumIDObj;
  let bandIDObj;
  for (let bandElm of allBands) {
    for (let albumBand of bandElm["albums"])
      if (albumBand._id.toString() === albumId) {
        albumIDObj = albumBand._id.toString();
        bandIDObj = bandElm._id;
        break;
      }
    if (albumIDObj) break;
  }

  if (!albumIDObj || !bandIDObj)
    throw new Error(`No Album for ID: '${albumId}'`);

  const updatedBand = await bandCol.findOneAndUpdate(
    { _id: new ObjectId(bandIDObj) },
    {
      $set: {
        overallRating: 1,
      },
      $pull: {
        albums: { _id: new ObjectId(albumIDObj) },
      },
    },
    { returnDocument: "after" }
  );

  if (updatedBand.lastErrorObject.n === 0) throw new Error("Failed to Update");

  updatedBand["value"]["_id"] = updatedBand["value"]["_id"].toString();

  return updatedBand["value"];
};

export default { create, get, getAll, remove };
