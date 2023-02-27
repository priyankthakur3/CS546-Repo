// You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
import { ObjectId } from "mongodb";
const checkIfString = (varName, varVal) => {
  if (typeof varVal !== "string" || varVal.trim().length < 1)
    throw new Error("Expected ID to be string");

  if (!ObjectId.isValid(id)) throw "Invalid Object ID";

  return true;
};

const isURL = (varName, varVal) => {
  /**
   * Function to check if string is URL or not
   * Input Variable Name, Variable Value in String
   */
  if (typeof varName !== "string" || varName.trim().length < 1)
    throw new Error(`Expected VarName to be non-empty String`);

  if (typeof varVal !== "string" || varVal.trim().length < 1)
    throw new Error(`Expected ${varName} to be non-empty String`);

  try {
    new URL(varVal);
    // console.log(url);
  } catch (e) {
    throw new Error(`Invalid URL!!! Expected ${varName} to be URL`);
  }

  return varVal.trim();
};

export { checkIfString, isURL };
