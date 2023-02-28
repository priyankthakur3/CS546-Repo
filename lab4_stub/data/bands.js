// TODO: Export and implement the following functions in ES6 format
import { ObjectId } from "mongodb";
import { bands } from "../config/mongoCollections.js";
import { isID, isURL, isString } from "../helpers.js";

const create = async (
  name,
  genre,
  website,
  recordCompany,
  groupMembers,
  yearBandWasFormed
) => {
  /**
   * !todo:
   */
  try {
    name = isString("name", name);
  } catch (error) {
    throw error;
  }

  if (!Array.isArray(genre) || genre.length < 1)
    throw new Error("Expected genre to be Non-Empty Array");

  for (let i = 0; i < genre.length; i++) {
    try {
      genre[i] = isString("genre", genre[i]);
    } catch (error) {
      throw error;
    }
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

  if (!Array.isArray(groupMembers) || groupMembers.length < 1)
    throw new Error("Expected groupMembers to be Array with one member");

  for (let i = 0; i < groupMembers.length; i++) {
    try {
      groupMembers[i] = isString("groupMember", groupMembers[i]);
    } catch (error) {
      throw error;
    }
  }

  let newBand = {
    name: name,
    genre: genre,
    website: website,
    recordCompany: recordCompany,
    groupMembers: groupMembers,
    yearBandWasFormed: yearBandWasFormed,
  };

  const bandsColl = await bands();
  const bandInfo = await bandsColl.insertOne(newBand);

  if (!bandInfo.acknowledged || !bandInfo.insertedId)
    throw "Could not add Band";

  const bandID = bandInfo.insertedId.toString();

  //fetch new inserted record from database for display
  const band = await get(bandID);
  return band;
};

const getAll = async () => {
  const bandsColl = await bands();
  let bandsList = await bandsColl.find({}).toArray();
  bandsList = bandsList.map((element) => {
    element._id = element._id.toString();
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

  // console.log(bandDetail);

  if (!bandDetail) throw new Error("Band not found");

  bandDetail["_id"] = bandDetail["_id"].toString();
  bandsCol.close;

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
    throw new Error(`Unable to delete Record for ID: ${id}`);

  console.log(bandDelete);

  if (bandDelete.hasOwnProperty("value"))
    return `${bandDelete["value"]["name"]} has been successfully deleted!`;
};

const rename = async (id, newName) => {
  try {
    id = isID(id);
  } catch (e) {
    throw e;
  }

  try {
    newName = isString("newName", newName);
  } catch (error) {
    throw error;
  }

  //get existing band info from database
  // will take of instance where is not found in database
  const currentBand = await get(id);

  if (currentBand["name"] === newName)
    throw new Error("Existing and New Band Name is same!!");

  const bandCol = await bands();

  const updateBand = {
    name: newName,
    genre: currentBand["genre"],
    website: currentBand["website"],
    recordCompany: currentBand["recordCompany"],
    groupMembers: currentBand["groupMembers"],
    yearBandWasFormed: currentBand["yearBandWasFormed"],
  };

  const updatedBand = await bandCol.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: updateBand },
    { returnDocument: "after" }
  );

  if (updatedBand.lastErrorObject.n === 0) throw new Error("Failed to Update");

  updatedBand["value"]["_id"] = updatedBand["value"]["_id"].toString();
  return updatedBand["value"];
};

export { create, get, getAll, remove, rename };
