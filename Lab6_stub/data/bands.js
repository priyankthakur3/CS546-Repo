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
  name = isString("name", name);
  genre = checkNonEmptyStrArr("Genre", genre);
  website = isURL("website", website);
  recordCompany = isString("recordCompany", recordCompany);
  groupMembers = checkNonEmptyStrArr("groupMembers", groupMembers);

  if (typeof yearBandWasFormed !== "number" || isNaN(yearBandWasFormed))
    throw new Error("Expected yearBandWasFormed to be Number");

  if (yearBandWasFormed < 1900 || yearBandWasFormed > new Date().getFullYear())
    throw new Error("Please insert proper year for yearBandWasFormed");

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
    throw new Error("Could not add Band");

  const bandID = bandInfo.insertedId.toString();
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
  id = isID(id);

  const bandsCol = await bands();

  let bandDetail = await bandsCol.findOne({
    _id: new ObjectId(id),
  });

  if (!bandDetail) throw new Error(`No Band Found`);

  bandDetail["_id"] = bandDetail["_id"].toString();
  if (bandDetail.albums.length > 0) {
    for (let i = 0; i < bandDetail.albums.length; i++) {
      bandDetail.albums[i]._id = bandDetail.albums[i]._id.toString();
    }
  }

  return bandDetail;
};

const remove = async (id) => {
  id = isID(id);

  const bandsCol = await bands();

  const bandObj = await bandsCol.findOne(
    { _id: new ObjectId(id) },
    { projection: { _id: 1 } }
  );

  if (!bandObj) throw new Error("No Band Found");

  const bandDelete = await bandsCol.findOneAndDelete({
    _id: new ObjectId(id),
  });

  if (bandDelete.hasOwnProperty("value"))
    return `${bandDelete["value"]["name"]} has been successfully deleted!`;
  else throw new Error("Error from Driver");
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
  id = isID(id);
  name = isString("name", name);
  genre = checkNonEmptyStrArr("Genre", genre);
  website = isURL("website", website);
  groupMembers = checkNonEmptyStrArr("groupMembers", groupMembers);

  recordCompany = isString("recordCompany", recordCompany);

  if (typeof yearBandWasFormed !== "number" || isNaN(yearBandWasFormed))
    throw new Error("Expected yearBandWasFormed to be Number");

  if (yearBandWasFormed < 1900 || yearBandWasFormed > new Date().getFullYear())
    throw new Error("Please insert proper year for yearBandWasFormed");

  const bandCol = await bands();

  const existBandID = await bandCol.findOne(
    { _id: new ObjectId(id) },
    { projection: { _id: 1 } }
  );

  if (!existBandID) {
    throw new Error(`Band Not Found`);
  }

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
