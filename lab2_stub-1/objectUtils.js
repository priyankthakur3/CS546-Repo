/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

import * as helper from "./helpers.js";

let areObjectsEqual = (...args) => {
  //this function takes in a variable number of objects that's what the ...args signifies

  //check if args is not undefined contains more than one value
  if (typeof args === "undefined" || args.length < 2)
    throw new Error("Error: Expected atleast two Objects");

  //check if all elements are object
  args.forEach((object) => {
    if (typeof object !== "object" || Array.isArray(object))
      throw new Error(
        "Error: Expected all objects, not arrays and other datatype"
      );
  });

  let firstObj = args[0];

  for (let index = 1; index < args.length; index++) {
    if (!helper.compareTwoObject(firstObj, args[index])) return false;
    firstObj = args[index];
  }

  return true;
};

let calculateObject = (object, funcs) => {
  //error check for parameter
  if (typeof object !== "object" || Array.isArray(object))
    throw new Error("Error: Excepted first parameter as Object");
  if (typeof funcs !== "object" || !Array.isArray(funcs))
    throw new Error("Error: Expected second parameter as Array of function");
  if (funcs.length < 1)
    throw new Error("Error: Expected atleast one function in second Parameter");

  funcs.forEach((func) => {
    if (typeof func !== "function")
      throw new Error(
        "Error: Expected every element in second parameter to be function"
      );
  });

  let resultObj = {};

  for (let key in object) {
    //error check if "value" is number
    if (typeof object[key] !== "number" || Number.isNaN(object[key]))
      throw new Error("Error: 'value' must be Number");
    let tempResElm = object[key];
    for (let index = 0; index < funcs.length; index++) {
      tempResElm = funcs[index](tempResElm);
    }
    resultObj[key] = Number(tempResElm.toFixed(2));
  }
  return resultObj;
};

let combineObjects = (...args) => {
  //this function takes in a variable number of objects that's what the ...args signifies
  if (args.length <= 1) throw new Error("Error: Expected two or more objects");
  args.forEach((arg) => {
    if (typeof arg !== "object" || Object.keys(arg).length === 0)
      throw new Error("Error: Expected Object");
  });
  let cleanArgs = args.map((object) => {
    let res = {};
    Object.keys(object).map((key) => {
      let temp = object.key;
      // console.log(key);
      res[key.trim()] = object[key];
    });
    return res;
  });

  // console.log("cleanArgs", args);
  let resultObj = {};
  for (let i = 0; i < args.length - 1; i++) {
    let firstObj = args[i];

    let commonKeys;
    for (let j = i + 1; j < args.length; j++) {
      try {
        commonKeys = helper.getIntersectKeys(firstObj, args[j]);
      } catch (e) {
        throw e;
      }

      commonKeys.forEach((key) => {
        if (!resultObj.hasOwnProperty(key)) {
          resultObj[key] = firstObj[key];
        }
      });
    }
  }

  return resultObj;
};

export { areObjectsEqual, combineObjects, calculateObject };
