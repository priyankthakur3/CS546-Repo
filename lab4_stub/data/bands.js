// TODO: Export and implement the following functions in ES6 format
import { ObjectId } from "mongodb";
import { bands } from "../config/mongoCollections.js";

const create = async (
  name,
  genre,
  website,
  recordCompany,
  groupMembers,
  yearBandWasFormed
) => {};

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

  if (!ObjectId.isValid(id)) throw "Invalid Object ID";

  const bandsCol = await bands();

  let bandDetail = await bandsCol.find({
    _id: ObjectId(id),
  });

  if (!bandDetail) throw new Error("Band not found");

  bandDetail["_id"] = bandDetail["_id"].toString();

  return bandDetail;
};

const remove = async (id) => {
  if (typeof id !== "string" || id.trim().length < 1)
    throw new Error("Expected ID to be string");

  if (!ObjectId.isValid(id)) throw new Error("Invalid Object ID");
};

const rename = async (id, newName) => {};
