// You can add and export any helper functions you want here - if you aren't using any, then you can just leave this file as is
import { ObjectId } from "mongodb";
//reusing code from lab4
const isID = (id) => {
  /**
   * Function to check if ID is of proper type or Not
   * Input: ID in String
   * Return type: trim varVal in String
   */
  if (typeof id !== "string" || id.trim().length < 1)
    throw new Error("Expected ID to be string");

  id = id.trim();

  if (!ObjectId.isValid(id)) throw new Error(`Invalid Object ID: '${id}'`);

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

const checkNonEmptyStrArr = (arrName, arrVal) => {
  /**
   * Function to check if Input Array Contains
   * Input Variable Name, Variable Value in String
   * Return type: Array of Trimed Elements in String
   */
  if (typeof arrName !== "string" || arrName.trim().length < 1)
    throw new Error(`Expected arrName to be non-empty String`);

  if (!Array.isArray(arrVal) || arrVal.length < 1)
    throw new Error(`Expected ${arrName} to be non-empty Array`);

  for (let i = 0; i < arrVal.length; i++) {
    arrVal[i] = isString(arrName, arrVal[i]);
  }
  return arrVal;
};

const checkReleaseYear = (yearVal) => {
  /**
   * Function to check if input value is betwen 1900 and next Year
   * Input Variable Value in String
   * Return type: year in Number
   */
  if (typeof yearVal !== "number")
    throw new Error("Error Expected Year to number");
  if (yearVal < 1900 || yearVal > new Date().getFullYear() + 1)
    throw new Error(
      `Error expected year between 1900 and ${new Date().getFullYear() + 1}`
    );
  return yearVal;
};

const checkDate = (varName, varVal) => {
  /**
   * Function to check if Input varVal is of type mm/dd/yyyy"
   * Input Variable Name, Variable Value in String
   * Return type: Trimed Input date in String
   */
  let regexDate = /^([0][1-9]|[1][0-2])\/([0-2][1-9]|[3][0-1])\/(\d{4})/;

  if (typeof varName !== "string" || varName.trim().length < 1)
    throw new Error(`Expected VarName to be non-empty String`);

  if (typeof varVal !== "string" || varVal.trim().length < 1)
    throw new Error(`Expected ${varName} to be non-empty String`);
  varVal = varVal.trim();
  if (!regexDate.test(varVal))
    throw new Error(`Expected ${varName} to be of format 'MM/DD/YYYY'`);
  let dateSplit = varVal.match(regexDate);
  let year = dateSplit[3];
  try {
    checkReleaseYear(Number(year));
  } catch (error) {
    throw new Error(`Invalid year in ${varName} `);
  }

  try {
  } catch (e) {
    throw new Error(`Invalid Date format for ${varName}`);
  }
  return varVal;
};

const getDecimalPlaces = (varName, varVal) => {
  /**
   * Function to check if Input varVal is of type mm/dd/yyyy"
   * Input Variable Name, Variable Value in String
   * Return type: Trimed Input date in String
   */

  if (typeof varName !== "string" || varName.trim().length < 1)
    throw new Error(`Expected VarName to be non-empty String`);

  if (typeof varVal !== "number" || isNaN(varVal))
    throw new Error(`Expected ${varName} to be Number`);

  if (Number.isInteger(varVal)) return 0;
  else return varVal.toString.split(".")[1].length;
};
export {
  isID,
  isString,
  isURL,
  checkNonEmptyStrArr,
  checkReleaseYear,
  checkDate,
  getDecimalPlaces,
};
