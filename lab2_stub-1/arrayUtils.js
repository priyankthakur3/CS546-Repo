/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

import * as helper from "./helpers.js";

let sortAndFilter = (
  array,
  [sortByField1, order1],
  [sortByField2, order2],
  filterBy,
  filterByTerm
) => {
  /**
   * !todo: Check if all error handling is implemented or not
   */
  //check if array exists
  if (typeof array !== "object") {
    throw new Error("Error: Expected Array");
  }

  //check if "array" is array and has more than one element
  if (!Array.isArray(array) && array.length <= 1) {
    throw new Error("Error: Expected Array and two elements");
  }

  //check if sortByField1 and sortByFiel2 is present
  if (
    typeof sortByField1 !== "string" ||
    typeof sortByField1 !== "string" ||
    sortByField1.trim().length === 0 ||
    sortByField2.trim().length === 0
  )
    throw new Error("Error: Check sortByField1 and sortByField2 arguments");
  // console.log(helper.checkOrderValue(order1));

  if (!helper.checkOrderValue(order1) || !helper.checkOrderValue(order2))
    //check if sortByField1 and sortByField2 is defined
    throw new Error("Error: Check Order value");

  //check if every element is object
  array.forEach((element) => {
    //check if every element is of type object
    if (typeof element !== "object")
      throw new Error("Error: Expected every Element of array to be object");

    //check if every object has atleast one key
    if (Object.keys(element).length < 1)
      throw new Error("Error: Every element of array to have atleast one key");

    let firstObjLength = Object.keys(array[0]).length;

    //check if all objects are having same length
    if (firstObjLength !== Object.keys(element).length) {
      throw new Error(
        "Error: Expected Every Array element to have common keys"
      );
    }
    //check if sortByField1 and sortByField2 exists in Objects

    if (
      !element.hasOwnProperty(sortByField1) ||
      !element.hasOwnProperty(sortByField2) ||
      !element.hasOwnProperty(filterBy)
    )
      throw new Error(
        `Error: Fields ${sortByField1}, ${sortByField2}, ${filterBy} not present. Please check inputs`
      );

    //error check for key type and length of keys
    Object.keys(element).forEach((key) => {
      ///console.log(key.trim(), typeof key, key.length);
      if (typeof key !== "string" || key.trim().length < 1)
        throw new Error(
          "Error: Expected Every key to be of type String and non-empty"
        );
    });
  });

  ///add error handling
  // deal with J j sort handling
  let filteredArr = array.filter((obj) => obj[filterBy] === filterByTerm);
  let resultArr = filteredArr.sort((a, b) => {
    const order1Lower = order1.toLowerCase();
    const order2Lower = order2.toLowerCase();

    if (a[sortByField1] < b[sortByField1]) {
      if (order1Lower.toLowerCase() === "asc") return -1;
      else return 1;
    } else if (a[sortByField1] > b[sortByField1]) {
      if (order1Lower === "asc") return 1;
      else return -1;
    } else {
      if (a[sortByField2] < b[sortByField2]) {
        if (order2Lower === "asc") return -1;
        else return 1;
      } else if (a[sortByField2] > b[sortByField2]) {
        if (order2Lower === "asc") return 1;
        else return 1;
      }
    }
  });

  return resultArr;
};

let merge = (...args) => {
  //this function takes in a variable number of arrays that's what the ...args signifies

  //check if passed element is array
  if (typeof args !== "object")
    throw new Error("Error: Expected array to be passed");

  //check if passed element is array and length greater than 1
  if (!Array.isArray(args) || args.length < 1)
    throw new Error(
      "Error: Expected array to be passsed with atleast one element"
    );

  let resultArr = [];
  let regexAlphaNumeric = /[\w-\s]/;

  for (let element of args) {
    //check if every args is of type array
    if (typeof element !== "object" || !Array.isArray(element)) {
      throw new Error("Error: Element is not array");
    }

    //flatten element
    let flattenArray = element.flat();

    //check if flatten array contains number or string
    flattenArray.forEach((element) => {
      // console.log(element, typeof element);
      if (
        typeof element !== "bigint" &&
        typeof element !== "number" &&
        typeof element !== "string"
      )
        throw new Error(
          "Error: Expected Every nested element to be type string or number"
        );

      //check if every element contains atleast one Alpha-Numeric character or space
      if (!regexAlphaNumeric.test(element))
        throw new Error(
          "Error: Expected each element to contain atleast one Alpha-Numeric character or space"
        );
    });

    //check if flattenArray has one element
    if (flattenArray.length < 1)
      throw new Error("Error: Expected each array to have atleast one element");

    resultArr.push(...flattenArray);
  }

  // sort according to ascii sort
  resultArr.sort((a, b) => {
    return String(a).localeCompare(String(b));
  });

  return resultArr;
};

let matrixMultiply = (...args) => {
  //this function takes in a variable number of arrays that's what the ...args signifies
  //error check for input type
  if (typeof args !== "object" || !Array.isArray(args))
    throw new Error("Error: Expected Array as input");

  //error for length of args
  if (args.length < 2) throw new Error("Error: Expected two inputs");

  //error check for every element to be array
  args.forEach((element) => {
    // console.log(element);
    if (typeof element !== "object" || !Array.isArray(element))
      throw new Error("Error: Expected every element to be Array");
    // check every matrix

    try {
      helper.checkMatrix(element);
    } catch (e) {
      throw e;
    }
  });

  let resultMatrix = args[0];

  //Complexity: O(M*N^3)
  //need to look for better way to optimize
  for (let secondMatrix of args.slice(1))
    try {
      resultMatrix = helper.twoMatrixMul(resultMatrix, secondMatrix);
    } catch (e) {
      throw e;
    }
  return resultMatrix;
};

export { sortAndFilter, merge, matrixMultiply };
