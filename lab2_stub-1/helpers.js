/* Todo: Implment any helper functions below 
    and then export them for use in your other files.
*/
const keepLowerAplhaNum = (string) => {
  //throw error if string is not of string type
  if (typeof string !== "string")
    throw new Error("Error: Expected String as Input");

  if (string.trim().length < 1) throw new Error("Error: String is empty");
  return string
    .trim()
    .replace(/[^a-zA-Z0-9\t\s]/g, "") // regex to get rid of non-alpha-numeric characters
    .toLowerCase()
    .replace(/[ \t]+/g, ""); //regex to get rid of extra space in word
};

const checkMatrix = (matrix) => {
  if (typeof matrix !== "object" || !Array.isArray(matrix))
    throw new Error("Error: Expected Array as input");

  let firstRowLen = matrix[0].length;

  //error check if each row has same number of elements
  matrix.forEach((row) => {
    if (typeof row !== "object" || !Array.isArray(row))
      throw new Error("Error: Matrix inner element is not Array");
    if (row.length !== firstRowLen)
      throw new Error("Error: Inner elements are not of same size");
  });

  //error check for every element to be number
  let flattenMatrix = matrix.flat(Infinity);
  flattenMatrix.forEach((elm) => {
    // console.log(elm);
    if (typeof elm !== "number")
      throw new Error("Error: Expected Every element datatype to be number");
  });

  /**
   * !todo: include return true false as well for future iteration
   */
};

const twoMatrixMul = (matA, matB) => {
  //initialize temp matrix

  // console.log(matA[0].length, matB.length);

  //check if col length of matrix A matches row length of matrix B
  if (matA[0].length !== matB.length)
    throw Error(
      "Error: First and Second Matrix col and row value do not match"
    );

  //calculate matrix
  let resultMatrix = [];
  for (let row = 0; row < matA.length; row++) {
    resultMatrix[row] = [];
    for (let col = 0; col < matB[0].length; col++) {
      let matrixElm = 0;
      for (let k = 0; k < matB.length; k++) {
        matrixElm += matA[row][k] * matB[k][col];
      }
      resultMatrix[row][col] = matrixElm;
    }
  }
  return resultMatrix;
};

const checkOrderValue = (orderString) => {
  //function to check order value
  // console.log(orderString.toLowerCase());
  if (
    orderString.toLowerCase() === "asc" ||
    orderString.toLowerCase() === "desc"
  )
    return true;
  return false;
};

const isTwoArrayEqual = (a, b) => {
  /**
   * Currently taking only two array into consideration
   * !todo: update function for n elements
   */
  if (
    typeof a !== "object" ||
    typeof b !== "object" ||
    !Array.isArray(a) ||
    !Array.isArray(b)
  )
    throw new Error("Error: Expected Two array element");
  let nonCommonElement = [];
  a.forEach((element) => {
    b.indexOf(element) === -1 ? nonCommonElement.push(element) : false;
  });
  return a.length === b.length && nonCommonElement.length === 0;
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
  if (!isTwoArrayEqual(aKeys, bKeys)) return false;

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

export {
  keepLowerAplhaNum,
  compareTwoObject,
  getIntersectKeys,
  checkOrderValue,
  twoMatrixMul,
  checkMatrix,
  isTwoArrayEqual,
};
