/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/
import { keepLowerAplhaNum } from "./helpers.js";
let palindromes = (string) => {
  //error check to check if input parameter is array with size greater than zero
  if (typeof string !== "object") {
    throw new Error("Error: Expected String to be Array");
  }

  if (!Array.isArray(string) || string.length < 1)
    throw new Error("Error: Expected Input parameter to non-empty Array");

  //fixed isArray check
  //check if input string is of array and has atleast one element
  if (!Array.isArray(string) && string.length < 1) {
    throw new Error("Error: Expected String to be Array and non empty");
  }

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

    //convert string to lowercase and get rid of all non-alpha numeric characters empty space
    try {
      return keepLowerAplhaNum(word);
    } catch (e) {
      throw e;
    }
  });
  // console.log(string, stringCleanLower);
  // clean string arr of any non alpha numeric character and convert to lowerCase
  // and reverse string
  let stringReversedArr = string.map((word) =>
    keepLowerAplhaNum(word.split("").reverse().join(""))
  );
  //iterate through string and check if original and reversed string is same
  for (let index = 0; index < stringCleanLower.length; index++) {
    if (stringReversedArr[index] === stringCleanLower[index]) {
      resultObject[stringCleanLower[index]] = true;
    } else {
      resultObject[stringCleanLower[index]] = false;
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

  ///check if badWordsList is array
  if (
    typeof badWordsList !== "object" ||
    !Array.isArray(badWordsList) ||
    badWordsList.length < 0
  ) {
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
  let regexAlphaNumeric = /\w/;
  let regexNonAlphaNumeric = /\W/;
  let regexSpace = /[\s\t]/g;

  ///function custom to deal with edge
  const checkIfWordsExists = (stringWords, wordCheckList) => {
    stringWords = stringWords.map((word) =>
      word.replace(/[^a-zA-Z0-9\s]/g, "")
    );
    let wordCheckListFiltered = wordCheckList.filter((value) =>
      stringWords.includes(value)
    );
    return wordCheckList.length === wordCheckListFiltered.length;
  };

  //error checks
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
  string = string.toLowerCase();
  word1 = word1.toLowerCase().trim();
  word2 = word2.toLowerCase().trim();

  //error check if words are present or not in String
  if (word1 === word2) throw new Error("Error: word1 and word2 are same!!!!!!");

  //error check if string contains atleast one Alpha-Numeric Character
  if (
    !regexAlphaNumeric.test(string) ||
    !regexAlphaNumeric.test(word1) ||
    !regexAlphaNumeric.test(word2)
  )
    throw new Error("Error: Input contains non-alphanumeric characters");

  let stringWords = string.split(" ");
  let word1Words = word1.split(" ");
  let word2Words = word2.split(" ");
  if (stringWords.length <= 2)
    throw new Error("Error: String contains less than 2 words");

  let word1Index = string.indexOf(word1);
  let word2Index = string.indexOf(word2);

  console.log(word1Index, word2Index);

  if (
    !checkIfWordsExists(stringWords, word1Words) ||
    !checkIfWordsExists(stringWords, word2Words)
  )
    throw new Error("Error: Either Word1 or Word2 is not present in String");
  // if (parseInt(word1Index) === -1 || parseInt(word1Index) === -1)
  //   throw new Error("Error: Either Word1 or Word2 is not present in String");

  if (parseInt(word1Index) > parseInt(word2Index))
    throw new Error("Error: Word1 is after Word2");

  let splitString = "";
  let minDistance = Number.MAX_SAFE_INTEGER;

  do {
    splitString = string.substring(word1Index + word1.length, word2Index + 1);
    minDistance = Math.min(splitString.match(regexSpace).length);
    word1Index = string.split(word2Index + 1).indexOf(word1);
    word2Index = string.split(word2Index + 1).indexOf(word2);
  } while (word1Index !== -1 || word2Index !== -1);

  return minDistance;
};

export { palindromes, censorWords, distance };
