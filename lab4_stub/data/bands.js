// TODO: Export and implement the following functions in ES6 format
import { ObjectId } from "mongodb";
import { bands } from "../config/mongoCollections.js";
import { isURL } from "../helpers.js";

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
  if (typeof name !== "string" || name.trim().length < 1)
    throw new Error("Expected name to be String");
  name = name.trim();

  if (!Array.isArray(genre) || genre.length < 1)
    throw new Error("Expected genre to be Non-Empty Array");

  for (let i = 0; i < genre.length; i++) {
    if (typeof genre[i] !== "string" || genre[i].trim().length < 1)
      throw new Error("Expected every genre to be non-empty string");
    genre[i] = genre[i].trim();
  }

  try {
    website = isURL("website", website);
  } catch (error) {
    throw error;
  }

  if (typeof recordCompany !== "string" || recordCompany.trim().length < 1)
    throw new Error("Expected recordCompany to be String");
  recordCompany = recordCompany.trim();

  if (typeof yearBandWasFormed !== "number")
    throw new Error("Expected yearBandWasFormed to be Number");

  if (yearBandWasFormed <= 1900 || yearBandWasFormed > new Date().getFullYear())
    throw new Error("Please insert proper year for yearBandWasFormed");

  if (!Array.isArray(groupMembers) || groupMembers.length < 1)
    throw new Error("Expected groupMembers to be Array with one member");

  for (let i = 0; i < groupMembers.length; i++) {
    if (
      typeof groupMembers[i] !== "string" ||
      groupMembers[i].trim().length < 1
    )
      throw new Error("Expected every groupMember to be non-empty string");
    groupMembers[i] = groupMembers[i].trim();
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
  if (typeof id !== "string" || id.trim().length < 1)
    throw new Error("Expected ID to be string");

  if (!ObjectId.isValid(id)) throw new Error("Invalid Object ID");

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
  if (typeof id !== "string" || id.trim().length < 1)
    throw new Error("Expected ID to be string");
  id = id.trim();
  if (!ObjectId.isValid(id)) throw new Error("Invalid Object ID");

  const bandsCol = await bands();

  const bandDelete = await bandsCol.findOneAndDelete({
    _id: new ObjectId(id),
  });

  if (bandDelete["lastErrorObject"]["n"] === 0)
    throw new Error(`Unable to delete Record for ID: ${id}`);

  if (bandDelete.hasOwnProperty("value"))
    return `${bandDelete["value"]["name"]} has been successfully deleted!`;
};

const rename = async (id, newName) => {};

export { create, get, getAll, remove, rename };
