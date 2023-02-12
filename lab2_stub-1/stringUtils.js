/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/
import { keepLowerAplhaNum } from "./helpers.js";
let palindromes = (string) => {
  //error handling pending

  let resultObject = {};
  // clean string arr of any non alpha numeric character and convert to lowerCase
  let stringCleanLower = string.map((word) => keepLowerAplhaNum(word));

  // clean string arr of any non alpha numeric character and convert to lowerCase
  // and reverse string
  let stringReversedArr = string.map((word) =>
    keepLowerAplhaNum(word.split("").reverse().join(""))
  );
  //iterate through string and check if original and reversed string is same
  for (let index = 0; index < string.length; index++) {
    if (stringReversedArr[index] === stringCleanLower[index]) {
      resultObject[string[index]] = true;
    } else {
      resultObject[string[index]] = false;
    }
  }

  return resultObject;
};

let censorWords = (string, badWordsList) => {
  let censorString = ["!", "@", "$", "#"];
  let index = 0;

  // function to mask word with censorString
  let maskWords = (word) => {
    let maskedWord = "";
    for (let chars in word) {
      maskedWord += censorString[index % 4];
      index++;
    }
    return maskedWord;
  };

  for (let word of badWordsList) {
    // if (typeof word !== "string ") {
    //   throw new Error (`Error for word : '${word}' : Badwords List needs to have only string`);
    // }
    // iterate through badWordsList and mask word with censorString
    string = string.replace(word, maskWords(word));
  }
  return string;
};

let distance = (string, word1, word2) => {
  if (
    typeof string !== "string" ||
    typeof word1 !== "string" ||
    typeof word2 !== "string"
  )
    throw new Error("Error: Expected Parameters to be String");
  if (
    string.trim().length === 0 ||
    word1.trim().length === 0 ||
    word2.trim().length === 0
  )
    throw new Error("Error: Parameters must contain string");

  if (word1 === word2)
    throw new Error("Error: Expected different words for getting index");

  if (string.match(/^[a-zA-Z0-9]+$/g).trim.length > 1) {
  }

  let words = string.split(" ");

  return false;
};

export { palindromes, censorWords, distance };
