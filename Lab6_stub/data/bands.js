// This data file should export all functions using the ES6 standard as shown in the lecture code
import { bands } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";

import { checkNonEmptyStrArr, isString, isURL, isID } from "../helpers.js";
const create = async (
  name,
  genre,
  website,
  recordCompany,
  groupMembers,
  yearBandWasFormed
) => {
  try {
    name = isString("name", name);
  } catch (error) {
    throw error;
  }

  try {
    genre = checkNonEmptyStrArr("Genre", genre);
  } catch (error) {
    throw error;
  }

  try {
    website = isURL("website", website);
  } catch (error) {
    throw error;
  }

  try {
    recordCompany = isString("recordCompany", recordCompany);
  } catch (error) {
    throw error;
  }

  if (typeof yearBandWasFormed !== "number" || isNaN(yearBandWasFormed))
    throw new Error("Expected yearBandWasFormed to be Number");

  if (yearBandWasFormed < 1900 || yearBandWasFormed > new Date().getFullYear())
    throw new Error("Please insert proper year for yearBandWasFormed");

  try {
    groupMembers = checkNonEmptyStrArr("groupMembers", groupMembers);
  } catch (error) {
    throw error;
  }

  let newBand = {
    name: name,
    genre: genre,
    website: website,
    recordCompany: recordCompany,
    groupMembers: groupMembers,
    yearBandWasFormed: yearBandWasFormed,
    albums: [],
    overallRating: 0,
  };

  const bandsCol = await bands();
  const bandInfo = await bandsCol.insertOne(newBand);

  if (!bandInfo.acknowledged || !bandInfo.insertedId)
    throw "Could not add Band";

  const bandID = bandInfo.insertedId.toString();

  //fetch new inserted record from database for display
  const band = await get(bandID);
  return band;
};

const getAll = async () => {
  const bandCol = await bands();

  let bandsList = await bandCol.find({}).toArray();
  bandsList = bandsList.map((element) => {
    element._id = element._id.toString();

    if (element.albums.length > 0) {
      for (let i = 0; i < element.albums.length; i++) {
        element.albums[i]._id = element.albums[i]._id.toString();
      }
    }

    return element;
  });
  return bandsList;
};

const get = async (id) => {
  try {
    id = isID(id);
  } catch (e) {
    throw e;
  }

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

const remove = async (id) => {
  try {
    id = isID(id);
  } catch (e) {
    throw e;
  }

  const bandsCol = await bands();

  const bandDelete = await bandsCol.findOneAndDelete({
    _id: new ObjectId(id),
  });

  if (bandDelete["lastErrorObject"]["n"] === 0)
    throw new Error(`No Band for ID: '${id}'`);

  if (bandDelete.hasOwnProperty("value")) return bandDelete["value"];
  else throw new Error("No Object Returned from DB");
};

const update = async (
  id,
  name,
  genre,
  website,
  recordCompany,
  groupMembers,
  yearBandWasFormed
) => {
  try {
    name = isString("name", name);
  } catch (error) {
    throw error;
  }

  try {
    genre = checkNonEmptyStrArr("Genre", genre);
  } catch (error) {
    throw error;
  }

  try {
    website = isURL("website", website);
  } catch (error) {
    throw error;
  }

  try {
    recordCompany = isString("recordCompany", recordCompany);
  } catch (error) {
    throw error;
  }

  if (typeof yearBandWasFormed !== "number" || isNaN(yearBandWasFormed))
    throw new Error("Expected yearBandWasFormed to be Number");

  if (yearBandWasFormed < 1900 || yearBandWasFormed > new Date().getFullYear())
    throw new Error("Please insert proper year for yearBandWasFormed");

  try {
    groupMembers = checkNonEmptyStrArr("groupMembers", groupMembers);
  } catch (err) {
    throw err;
  }

  // const currentBand = await get(id);
  const bandCol = await bands();

  const updatedBand = await bandCol.findOneAndUpdate(
    { _id: new ObjectId(id) },
    {
      $set: {
        name,
        genre,
        website,
        recordCompany,
        groupMembers,
        yearBandWasFormed,
      },
    },
    { returnDocument: "after" }
  );

  if (updatedBand.lastErrorObject.n === 0) throw new Error("Failed to Update");

  updatedBand["value"]["_id"] = updatedBand["value"]["_id"].toString();
  return updatedBand["value"];
};

export default { create, get, getAll, remove, update };
