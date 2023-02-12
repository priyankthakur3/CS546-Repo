/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

import * as helper from "./helpers.js";

let areObjectsEqual = (...args) => {
  //this function takes in a variable number of objects that's what the ...args signifies
  let firstObj = args[0];

  for (let index = 1; index < args.length; index++) {
    if (!helper.compareTwoObject(firstObj, args[index])) return false;
    firstObj = args[index];
  }

  return true;
};

let calculateObject = (object, funcs) => {
  if (typeof object !== "object")
    throw new Error("Error: Excepted {key:value} input");
  let resultObj = {};

  for (let key in object) {
    if (typeof object[key] !== "number")
      throw new Error("Error: Object must be Number");
    let tempResElm = object[key];
    for (let index = 0; index < funcs.length; index++) {
      // console.log(funcs[index]);
      // if (typeof funcs[index] !== "function")
      //   throw new Error("Error: Function expected");
      tempResElm = funcs[index](tempResElm);
    }
    resultObj[key] = tempResElm.toFixed(2);
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
  let resultObj = {};
  for (let i = 0; i < args.length; i++) {
    let tempObj = args[i];
    for (const key in tempObj) {
      if (!resultObj.hasOwnProperty(key)) {
        for (let j = i + 1; j < args.length; j++) {
          console.log(key, tempObj, args[j]);
          if (args[j].hasOwnProperty(key)) {
            /**
             * todo: Convert to use intersection method
             */
            resultObj[key] = tempObj[key];
            break;
          }
        }
      }
    }
  }

  return resultObj;
};

export { areObjectsEqual, combineObjects, calculateObject };
