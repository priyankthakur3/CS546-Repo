/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/
import { getIntersectKeys, keepLowerAplhaNum } from "./helpers.js";
let palindromes = (string) => {
  //error check to check if input parameter is array with size greater than zero
  if (typeof string !== "object") {
    throw new Error("Error: Expected String to be Array");
  }

  if (!string.isArray && string.length < 1) {
    throw new Error("Error: Expected String to be Array and non empty");
  }

  /* !string.isArray() && typeof string.length < 1;*/

  let resultObject = {};
  let regexAlphaNumeric = /\w/;
  // clean string arr of any non alpha numeric character and convert to lowerCase
  let stringCleanLower = string.map((word) => {
    if (typeof word !== "string")
      throw new Error(`Error: Expected every parameter element to be string`);
    if (!regexAlphaNumeric.test(word)) {
      throw new Error(
        "Error: Expected String to contain one Alpha-Numeric Character"
      );
    }
    keepLowerAplhaNum(word);
  });

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
  /**
   * !todo: check for case if in badWordsList in case of "chocolate ,chip" sensor chocolate and chip instead of "chocolate ,chip"
   * !todo: check if badWordsList string doesnot contain only non-alphanumeric
   */
  if (typeof string !== "string" || string.trim().length === 0) {
    throw new Error("Error: Expected Input as String");
  }
  //console.log(typeof badWordsList);
  if (typeof badWordsList !== "object" || badWordsList.length < 0) {
    throw new Error("Error: Expected badWordsList to be array");
  }

  let censorString = ["!", "@", "$", "#"];
  let index = 0;

  // function to mask word with censorString
  // for every character in badWordList element mask
  // and increment index
  let maskWords = (word) => {
    let maskedWord = "";

    //iterate for every char in word and mask with censorString
    for (let char in word.trim()) {
      maskedWord += censorString[index++ % 4];
    }
    return maskedWord;
  };

  for (let word of badWordsList) {
    //error check to check if datatype of every word is string
    if (typeof word !== "string") {
      throw new Error(
        `Error for '${word}' : Badwords List needs to have only string`
      );
    }

    //check if every word exists if not throw error
    if (string.indexOf(word) === -1)
      throw new Error(
        "Error: Each element in badWordsList must exist in string"
      );
    //replace every badword with mask string
    string = string.replace(word, maskWords(word));
  }
  return string;
};

let distance = (string, word1, word2) => {
  let regexNonAlphaNumeric = /\W/g;
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

  // if (
  //   !regexNonAlphaNumeric.test(string) ||
  //   !regexNonAlphaNumeric.test(word1) ||
  //   !regexNonAlphaNumeric.test(word2)
  // )
  //   throw new Error("Error: Input contains non-alphanumeric characters");

  let words = string.split(" ");
  if (words.length <= 2)
    throw new Error("Error: String contains less than 2 words");

  let word1Index = words.indexOf(word1);
  let word2Index = words.indexOf(word2);

  //console.log(word1Index, word2Index);

  if (word1Index >= word2Index)
    throw new Error("Error: Word1 must appear before Word2");

  return word2Index - word1Index;
};

export { palindromes, censorWords, distance };
