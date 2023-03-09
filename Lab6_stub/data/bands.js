// This data file should export all functions using the ES6 standard as shown in the lecture code
import { bands } from "../config/mongoCollections.js";
import { checkNonEmptyStrArr, isString } from "../helpers.js";
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
  const bandCol = await bands();

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

  if (bandDelete.hasOwnProperty("value")) return bandDelete["value"];
  else return {};
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
  } catch (error) {
    throw error;
  }

  const currentBand = await get(id);

  const bandCol = await bands();

  const updateBand = {
    name: newName,
    genre: currentBand["genre"],
    website: currentBand["website"],
    recordCompany: currentBand["recordCompany"],
    groupMembers: currentBand["groupMembers"],
    yearBandWasFormed: currentBand["yearBandWasFormed"],
    albums: currentBand["albums"],
    overallRating: currentBand["overallRating"],
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
