// You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
import { ObjectId } from "mongodb";
const checkID = (id) => {
  if (typeof id !== "string" || id.trim().length < 1)
    throw new Error("Expected ID to be string");

  if (!ObjectId.isValid(id)) throw "Invalid Object ID";

  return true;
};

export { checkID };
