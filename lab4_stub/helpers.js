// You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
import { ObjectId } from "mongodb";
/**
 * !todo: remove varNAme from isURL
 */
const isID = (id) => {
  /**
   * Function to check if ID is of proper type or Not
   * Input: ID in String
   * Return type: trim varVal in String
   */
  if (typeof id !== "string" || id.trim().length < 1)
    throw new Error("Expected ID to be string");

  id = id.trim();

  if (!ObjectId.isValid(id)) throw new Error(`Invalid Object ID: ${id}`);

  return id;
};

const isString = (varName, varVal) => {
  /**
   * Function to check if string is string or not
   * Input Variable Name, Variable Value in String
   * Return type: trim varVal in String
   */
  if (typeof varName !== "string" || varName.trim().length < 1)
    throw new Error(`Expected VarName to be non-empty String`);

  if (typeof varVal !== "string" || varVal.trim().length < 1)
    throw new Error(`Expected ${varName} to be non-empty String`);

  return varVal.trim();
};

const isURL = (varName, varVal) => {
  /**
   * Function to check if string is URL or not
   * Input Variable Name, Variable Value in String
   * Return type: trim URL in String
   */
  if (typeof varName !== "string" || varName.trim().length < 1)
    throw new Error(`Expected VarName to be non-empty String`);

  if (typeof varVal !== "string" || varVal.trim().length < 1)
    throw new Error(`Expected ${varName} to be non-empty String`);

  varVal = varVal.trim();
  varName = varName.trim();

  let regexString = /^(https?:\/\/www\.)[a-zA-Z0-9-.]{5,}(\.com)$/i;

  if (!regexString.test(varVal))
    throw new Error(
      `Expected ${varName} to be URL with Domain having atleast 5 character`
    );

  return varVal;
};

export { isID, isString, isURL };
