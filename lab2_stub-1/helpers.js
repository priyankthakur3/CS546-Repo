/* Todo: Implment any helper functions below 
    and then export them for use in your other files.
*/
const keepLowerAplhaNum = (string) => {
  //error handling pending
  return string
    .replace(/[^a-zA-Z0-9\t\s]/g, "") // regex to get rid of non-alpha-numeric characters
    .toLowerCase()
    .replace(/[ \t]+/g, ""); //regex to get rid of extra space in word
};

const compareTwoObject = (a, b) => {
  // check if values are equal
  if (a === b) return true;

  ///debug debug debug
  // console.log(`${a}:${typeof a}, ${b}:${typeof b}`);

  //check if both are objects
  //there can be condition like a will contain list or object and b will get null
  //and node will throw all errors
  if (typeof a !== "object" || typeof b !== "object") return false;

  //get all keys values in array
  let aKeys = Object.keys(a);
  let bKeys = Object.keys(b);

  ///debug debug debug
  // console.log(aKeys, bKeys);

  //if keys are uneven return false
  if (aKeys.length !== bKeys.length) return false;

  //iterate through keys and check
  for (let key of aKeys) {
    if (compareTwoObject(a[key], b[key]) === false) return false;
  }
  return true;
};

const getIntersectKeys = (a, b) => {
  let resultArr = [];
  if (typeof a !== "object" && typeof b != "object")
    throw new Error("Error: Expected Two objects");
  if (Object.keys(a).length < 1 || Object.keys(b).length < 1)
    throw new Error("Error: Expected Object with size greater than 0");
  resultArr = Object.keys(a).filter((value) => Object.keys(b).includes(value));
  return resultArr;
};

export { keepLowerAplhaNum, compareTwoObject, getIntersectKeys };
