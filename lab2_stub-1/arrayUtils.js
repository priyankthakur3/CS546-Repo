/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

let sortAndFilter = (
  array,
  [sortByField1, order1],
  [sortByField2, order2],
  filterBy,
  filterByTerm
) => {
  ///add error handling
  // deal with J j sort handling
  let filteredArr = array.filter((obj) => obj[filterBy] === filterByTerm);
  let resultArr = filteredArr.sort((a, b) => {
    if (a[sortByField1] < b[sortByField1]) {
      if (order1 === "asc") return -1;
      else return 1;
    } else if (a[sortByField1] > b[sortByField1]) {
      if (order1 === "asc") return 1;
      else return -1;
    } else {
      if (a[sortByField2] < b[sortByField2]) {
        if (order2 === "asc") return -1;
        else return 1;
      } else if (a[sortByField2] > b[sortByField2]) {
        if (order2 === "asc") return 1;
        else return 1;
      }
    }
  });

  return resultArr;
};

let merge = (...args) => {
  //this function takes in a variable number of arrays that's what the ...args signifies
  let resultArr = [];

  for (let element of args) {
    // if (typeof element !== "array") {
    //   throw new Error("Error: Element is not array");
    // }
    //error check pending
    resultArr.push(...element.flat());
  }
  resultArr.sort((a, b) => {
    return String(a).localeCompare(String(b));
  });

  return resultArr;
};

let matrixMultiply = (...args) => {
  //this function takes in a variable number of arrays that's what the ...args signifies

  let resultMatrix = args[0];

  for (let secondMatrix of args.slice(1)) {
    let tempMatrix = [];
    for (let row = 0; row < resultMatrix.length; row++) {
      let tempRow = [];
      for (let col = 0; col < secondMatrix[0].length; col++) {
        let matrixElm = 0;
        for (let k = 0; k < secondMatrix[0].length; k++) {
          matrixElm += resultMatrix[row][k] * secondMatrix[k][col];
        }
        tempRow.push(matrixElm);
      }
      tempMatrix.push(tempRow);
    }
    resultMatrix = tempMatrix;
  }

  return resultMatrix;
};

export { sortAndFilter, merge, matrixMultiply };
