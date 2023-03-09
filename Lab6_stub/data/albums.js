// This data file should export all functions using the ES6 standard as shown in the lecture code

import { ObjectId } from "mongodb";
import { bands } from "../config/mongoCollections.js";
import { checkNonEmptyStrArr, isID, isString } from "../helpers.js";

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
    tracks = checkNonEmptyStrArr(tracks);
  } catch (error) {
    throw error;
  }

  if (typeof rating !== "number" || isNaN(rating))
    throw new Error("Improper Album Rating");

  if (rating < 1 || rating > 5) throw new Error("Improper Album Rating");

  const bandsCol = await bands();

  await bandsCol.updateOne(
    { _id: id },
    {
      $push: {
        album: {
          _id: new ObjectId(),
          title,
          releaseDate,
          tracks,
          rating,
        },
      },
    }
  );
};

const getAll = async (bandId) => {};

const get = async (albumId) => {};

const remove = async (albumId) => {};
