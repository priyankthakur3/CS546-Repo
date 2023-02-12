/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/
import * as stringUtils from "./stringUtils.js";
import * as arrayUtils from "./arrayUtils.js";
import * as objectUtils from "./objectUtils.js";
let people = [
  { name: "Ryan", age: "22", location: "Hoboken", role: "Student" },
  { name: "Matt", age: "21", location: "New York", role: "Student" },
  { name: "Matt", age: "25", location: "New Jersey", role: "Student" },
  { name: "Greg", age: "22", location: "New York", role: "Student" },
  { name: "Mike", age: "21", location: "Chicago", role: "Teacher" },
];

console.log(
  arrayUtils.sortAndFilter(
    people,
    ["name", "desc"],
    ["location", "asc"],
    "role",
    "Student"
  )
);

console.log(
  arrayUtils.merge(
    [3, 0, "Lab2", 2, "Aiden"],
    ["CS-546", "Computer Science", 8, 15],
    [6, 3, "!Patrick", 25, 29],
    [["cs2143"]]
  )
);
console.log(stringUtils.palindromes(["Maa!m", "Hello234@$#@ ", "Ma	dam!@"]));

let badWords = ["bread", "chocolate", "pop"];

console.log(
  stringUtils.censorWords(
    "I like bread that has chocolate chips in it but I do not like lollipops",
    badWords
  )
);

const first = { a: 2, b: 3 };
const second = { a: 2, b: 4 };
const third = { a: 2, b: 3 };
const forth = {
  a: { sA: "Hello", sB: "There", sC: "Class" },
  b: 7,
  c: true,
  d: "Test",
};
const fifth = {
  c: true,
  b: 7,
  d: "Tegst",
  a: { sB: "There", sC: "Class", sA: "Hello" },
};
const sixth = {
  name: { firstName: "Patrick", lastName: "Hill" },
  age: 47,
  dob: "9/25/1975",
  hobbies: ["Playing music", "Movies", "Spending time with family"],
};
const eight = {
  name: { firstName: "Patrick", lastName: "Hill" },
  age: 47,
  dob: "9/25/1975",
  hobbies: ["Playing music", "Movies", "Spending time with family"],
};
const seventh = {
  age: 47,
  name: { firstName: "Patrick", lastName: "Hill" },
  hobbies: ["Playing music", "Movies", "Spending time with family"],
  dob: "9/25/195",
};
const eighth = { b: 3, a: 2 };
console.log("----------------");
console.log(objectUtils.areObjectsEqual(sixth, seventh, eight));

console.log(
  objectUtils.calculateObject({ a: 3, b: 7, c: 5 }, [
    (n) => n * 2,
    (n) => Math.sqrt(n),
  ])
);

console.log(
  objectUtils.combineObjects(
    { a: 3, b: 7, c: 5 },
    { d: 4, e: 9 },
    { a: 8, d: 2 }
  )
);
