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

//test cases for sortAndFilter
//ideal case: everything is in order
/* expected output: 
[{name: 'Greg', age: '22', location: 'New York', role: 'Student'},
{name: 'Matt', age: '25', location: 'New Jersey', role: 'Student'},
{name: 'Matt', age: '21', location: 'New York', role: 'Student'},
{name: 'Ryan', age: '22', location: 'Hoboken', role: 'Student'}] 
 */
try {
  console.log(
    arrayUtils.sortAndFilter(
      people,
      ["name", "asc"],
      ["location", "asc"],
      "role",
      "Student"
    )
  );
} catch (e) {
  console.log(e);
}

//test cases for merge
//ideal every element is string in all nested
//expected output { 'Maa!m': true, 'Hello234@$#@ ': false, 'Ma\tdam!@': true }
try {
  console.log(
    arrayUtils.merge(
      [3, 0, "Lab2", 2, "Aiden"],
      ["CS-546", "Computer Science", 8, 15],
      [6, 3, "!Patrick", 25, 29],
      [["cs2143"]]
    )
  );
} catch (e) {
  console.log(e);
}

//test cases for merge
//case: if nested element is object
//expected output Error
try {
  console.log(
    arrayUtils.merge(
      [3, 0, "Lab2", 2, "Aiden"],
      [{}],
      [6, 3, "!Patrick", 25, 29],
      [["cs2143"]]
    )
  );
} catch (e) {
  console.log(e);
}

//test cases for merge
//case: if nested array contains boolean
//expected output Error
try {
  console.log(
    arrayUtils.merge(
      [3, 0, "Lab2", 2, "Aiden"],
      [true],
      [6, 3, "!Patrick", 25, 29],
      [["cs2143"]]
    )
  );
} catch (e) {
  console.log(e);
}

//test cases for matrixMultiply
//ideal case: Every matrix element is of proper length
//expected output: [[32]]
try {
  console.log(arrayUtils.matrixMultiply([[3, 5]], [[4], [4]]));
} catch (e) {
  console.log(e);
}

//test cases for matrixMultiply
//ideal case: Every matrix element is of proper length
//expected output: [ [48], [66], [84] ]
try {
  console.log(
    arrayUtils.matrixMultiply(
      [
        [2, 3],
        [3, 4],
        [4, 5],
      ],
      [
        [1, 1, 1],
        [2, 2, 2],
      ],
      [[3], [2], [1]]
    )
  );
} catch (e) {
  console.log(e);
}

//test cases for matrixMultiply
//case: inner matrix array is of improper length
//expected output: error

try {
  console.log(
    arrayUtils.matrixMultiply(
      [
        [2, 3],
        [3, 4],
        [4, 5],
      ],
      [
        [1, 1, 1, 3],
        [2, 2, 2],
      ],
      [[3], [2], [1]]
    )
  );
} catch (e) {
  console.log(e);
}

//test cases for matrixMultiply
//case: one matrix element is of different datatype
//expected output: error
try {
  console.log(
    arrayUtils.matrixMultiply(
      [
        [2, 3],
        [3, 4],
        [4, 5],
      ],
      [
        [1, 1, true],
        [2, 2, 2],
      ],
      [[3], [2], [1]]
    )
  );
} catch (e) {
  console.log(e);
}

//test cases for matrixMultiply
//case: one matrix is given
//expected output: error
try {
  console.log(
    arrayUtils.matrixMultiply([
      [2, 3],
      [3, 4],
      [4, 5],
    ])
  );
} catch (e) {
  console.log(e);
}

//test cases for matrixMultiply
//case: First matrix col length doesnot match row len of second matrix
//expected output: error
try {
  console.log(
    arrayUtils.matrixMultiply(
      [
        [2, 3],
        [3, 4],
        [4, 5],
      ],
      [
        [1, 1, 1, 3],
        [2, 2, 2, 4],
        [3, 4, 5, 4],
      ]
    )
  );
} catch (e) {
  console.log(e);
}

//test cases for palindromes
//ideal every element is string and palindrome
//expected output { 'Maa!m': true, 'Hello234@$#@ ': false, 'Ma\tdam!@': true }
try {
  console.log(stringUtils.palindromes(["Maa!m", "Hello234@$#@ ", "Ma	dam!@"]));
} catch (e) {
  console.log(e);
}

//test case for palindromes
//case: empty array is passed
//expected output Error
try {
  console.log(stringUtils.palindromes([]));
} catch (e) {
  console.log(e);
}

//test case for palindromes
//case when one element is not palindrome
//expected output {madam: true, loot: false, wasitacatisaw: true, poordanisinadroop: true, anna: true, nope: false}
try {
  console.log(
    stringUtils.palindromes([
      "Madam",
      "Loot",
      "Was it a cat I saw?",
      "Poor Dan is in a droop",
      "Anna",
      "Nope",
    ])
  );
} catch (e) {
  console.log(e);
}

//test case for palindromes
//case no element is passed
//expected output Error
try {
  console.log(stringUtils.palindromes());
} catch (e) {
  console.log(e);
}

//test case for palindromes
//case: array element contains only non-alphanumeric characters
//expected output Error
try {
  console.log(stringUtils.palindromes(["Madam", "!@"]));
} catch (e) {
  console.log(e);
}

//test cases for palindromes
//case: String contains only non-alpha Numeric character
//expected output : error
try {
  console.log(stringUtils.palindromes(["Maa!m", "@ ", "Ma	dam!@"]));
} catch (e) {
  console.log(e);
}

//test cases for palindromes
//case: String is empty
//expected output : error
try {
  console.log(stringUtils.palindromes(["Maa!m", " ", "Ma	dam!@"]));
} catch (e) {
  console.log(e);
}

//test cases for censorWords
//ideal test case
//expected output "I like !@$#! that has @$#!@$#!@ chips in it but I do not like lolli$#!s"
try {
  console.log(
    stringUtils.censorWords(
      "I like bread that has chocolate chips in it but I do not like lollipops",
      ["bread", "chocolate", "pop"]
    )
  );
} catch (e) {
  console.log(e);
}

//test cases for censorWords
//case when all badwords are not present in string
//expected output: error

try {
  console.log(
    stringUtils.censorWords(
      "I like bread that has chocolate chips in it but I do not like lollipops",
      ["bread", "chocolate", "pop", "the"]
    )
  );
} catch (e) {
  console.log(e);
}

//test cases for censorWords
//case when there is number in string are not present in string
//expected output: Error

try {
  console.log(
    stringUtils.censorWords(
      "I like bread that has chocolate chips in it but I do not like lollipops",
      ["bread", 1, "pop"]
    )
  );
} catch (e) {
  console.log(e);
}

//testcase for areObjectsEqual
try {
  objectUtils.areObjectsEqual({ a: 2, b: 3 }, { a: 2, b: 3 }, { b: 3, a: 2 });
} catch (e) {
  console.log(e);
}

const first = { a: 2, b: 3 };
const second = { a: 2, b: 4 };
const third = { b: 3, a: 2 };
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

console.log(
  stringUtils.distance("The brown fox jumped over the lazy dog", "fox", "dog")
);
