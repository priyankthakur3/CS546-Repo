let isnumPrime = (number) => {
  // prime number are always greater than 1
  // ref: https://en.wikipedia.org/wiki/Prime_number
  if (number <= 1) {
    return false;
  }

  for (let i = 2; i <= Math.sqrt(number); i++) {
    // Letting Loop run only sqrt of number to keep worst case complexity at O(sqrt(n))
    if (number % i === 0) {
      return false;
    }
  }
  return true;
};

export const questionOne = (arr) => {
  let finalResult = {};
  let result = 0;
  for (let x of arr) {
    result = result + x ** 3;
  }
  //call udf isnumPrime function and check is prime number
  // and return key:value accordingly
  if (isnumPrime(result)) {
    finalResult[result] = true;
  } else {
    finalResult[result] = false;
  }

  return finalResult; //return result
};

export const questionTwo = (numArray) => {
  // Implement question 2 here
  let resultArr = [];
  for (let leftIndex = 0; leftIndex < numArray.length - 1; leftIndex++) {
    if (numArray[leftIndex] > numArray[leftIndex + 1]) {
      resultArr = [false, leftIndex, leftIndex + 1];
      break;
    }
    //check if current and next position element is equal and increment index if same
    else if (numArray[leftIndex] === numArray[leftIndex + 1]) {
      leftIndex++;
    } else {
      resultArr = [true];
    }
  }

  return resultArr;
};

export const questionThree = (obj1, obj2) => {
  let resultObj = {};
  let keysArray = [];

  //add all keys to keysarray using spread operator
  keysArray.push(...Object.keys(obj1));
  keysArray.push(...Object.keys(obj2));

  //converting array to set to get rid of duplication of keys
  keysArray = new Set(keysArray);

  for (let key of keysArray) {
    //check if key exists in both object if yes
    //then add key:true pair to result object
    //if doesn't then add key:false pair to result object

    if (obj1[key] && obj2[key]) {
      resultObj[key] = true;
    } else {
      resultObj[key] = false;
    }
  }
  return resultObj;
};

export const questionFour = (string) => {
  let resultArr = [];
  if (typeof string != "string" || string.trim().length === 0) {
    return resultArr;
  }
  for (let line of string.split("\n")) {
    //check if there is any empty line in string or if null
    if (line.trim().length != 0 && typeof line !== "undefined") {
      //split data on ',' then trim whitespace from words array
      resultArr.push(line.split(",").map((word) => word.trim()));
    }
  }
  return resultArr;
};

export const studentInfo = {
  firstName: "Priyank",
  lastName: "Thakur",
  studentId: "20009546",
};
