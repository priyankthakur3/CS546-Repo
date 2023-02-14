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
  const x = arrayUtils.sortAndFilter(
    people,
    ["name", "asc"],
    ["location", "asc"],
    "role",
    "Student"
  );
  console.log(
    `sortAndFilter Test case 1 passed! Value Returned: \n${JSON.stringify(
      x,
      null,
      1
    )}  `
  );
} catch (e) {
  console.log(`sortAndFilter Test case 1 failed! Error Message: ${e.message} `);
}

//test cases for sortAndFilter
//case 2: everything is in order
try {
  const x = arrayUtils.sortAndFilter(
    people,
    ["name", "asc"],
    ["location", "desc"],
    "role",
    "Student"
  );
  console.log(
    `sortAndFilter Test case 2 passed! Value Returned: \n${JSON.stringify(
      x,
      null,
      1
    )} `
  );
} catch (e) {
  console.log(`sortAndFilter Test case 2 failed! Error Message: ${e.message} `);
}

//test cases for sortAndFilter
//case 3: everything is in order
try {
  const x = arrayUtils.sortAndFilter(
    people,
    ["location", "asc"],
    ["name", "asc"],
    "age",
    "22"
  );
  console.log(
    `sortAndFilter Test case 3 passed! Value Returned: \n${JSON.stringify(
      x,
      null,
      1
    )} `
  );
} catch (e) {
  console.log(`sortAndFilter Test case 3 failed! Error Message: ${e.message} `);
}

try {
  const x = arrayUtils.sortAndFilter(
    people,
    ["location", "asc"],
    ["name", "asc"],
    "age",
    "22"
  );
  console.log(
    `sortAndFilter Test case 4 passed! Value Returned: \n${JSON.stringify(
      x,
      null,
      1
    )} `
  );
} catch (e) {
  console.log(`sortAndFilter Test case 4 failed! Error Message: ${e.message} `);
}
try {
  const x = arrayUtils.sortAndFilter(
    people,
    ["location", "asc"],
    ["name", "asc"],
    "age",
    22
  );
  console.log(
    `sortAndFilter Test case 5 passed! Value Returned: \n${JSON.stringify(
      x,
      null,
      1
    )} `
  );
} catch (e) {
  console.log(`sortAndFilter Test case 5 failed! Error Message: ${e.message} `);
}

try {
  const x = arrayUtils.sortAndFilter(
    people,
    ["ssn", "asc"],
    ["name", "asc"],
    "age",
    "22"
  );
  console.log(
    `sortAndFilter Test case 6 passed! Value Returned: \n${JSON.stringify(
      x,
      null,
      1
    )} `
  );
} catch (e) {
  console.log(`sortAndFilter Test case 6 failed! Error Message: ${e.message} `);
}

//test cases for merge
//ideal every element is string in all nested
//expected output { 'Maa!m': true, 'Hello234@$#@ ': false, 'Ma\tdam!@': true }
try {
  const x = arrayUtils.merge(
    [3, 0, "Lab2", 2, "Aiden"],
    ["CS-546", "Computer Science", 8, 15],
    [6, 3, "!Patrick", 25, 29],
    [["cs2143"]]
  );
  console.log(`merge Test Case 1 passed! Value Returned: \n${x}`);
} catch (e) {
  console.log(`merge Test Case 1 failed! Error: ${e.message}`);
}

//test cases for merge
//case: if nested element is object
//expected output Error
try {
  const x = arrayUtils.merge(
    [3, 0, "Lab2", 2, "Aiden"],
    [{}],
    [6, 3, "!Patrick", 25, 29],
    [["cs2143"]]
  );
  console.log(`merge Test Case 2 passed! Value Returned: \n${x}`);
} catch (e) {
  console.log(`merge Test Case 2 failed! Error: ${e.message}`);
}

//test cases for merge
//case: if nested array contains boolean
//expected output Error
try {
  const x = arrayUtils.merge(
    [3, 0, "Lab2", 2, "Aiden"],
    [true],
    [6, 3, "!Patrick", 25, 29],
    [["cs2143"]]
  );
  console.log(`merge Test Case 3 passed! Value Returned: \n${x}`);
} catch (e) {
  console.log(`merge Test Case 3 failed! Error: ${e.message}`);
}

//test cases for merge
//case: if nested array contains boolean
//expected output : [0, 1, 5, 7, 8, "bar", "buzz", "fizz", "foo"]
try {
  const x = arrayUtils.merge(
    ["bar", 0, 1, [[[5, "foo"]]]],
    [7, "buzz", ["fizz", 8]]
  );
  console.log(`merge Test Case 4 passed! Value Returned: \n${x}`);
} catch (e) {
  console.log(`merge Test Case 4 failed! Error: ${e.message}`);
}

//test cases for matrixMultiply
//ideal case: Every matrix element is of proper length
//expected output: [[32]]
try {
  const x = arrayUtils.matrixMultiply([[3, 5]], [[4], [4]]);
  console.log(`matrixMultiply Test Case 1 passed! Value Returned:\n ${x}`);
} catch (e) {
  console.log(`matrixMultiply Test Case 1 failed! Error: ${e.message}`);
}

//test cases for matrixMultiply
//ideal case: Every matrix element is of proper length
//expected output: [ [48], [66], [84] ]
try {
  const x = arrayUtils.matrixMultiply(
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
  );
  console.log(`matrixMultiply Test Case 2 passed! Value Returned:\n ${x}`);
} catch (e) {
  console.log(`matrixMultiply Test Case 2 failed! Error: ${e.message}`);
}

//test cases for matrixMultiply
//case: inner matrix array is of improper length
//expected output: error

try {
  const x = arrayUtils.matrixMultiply(
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
  );
  console.log(`matrixMultiply Test Case 3 passed! Value Returned:\n ${x}`);
} catch (e) {
  console.log(`matrixMultiply Test Case 3 failed! Error: ${e.message}`);
}

//test cases for matrixMultiply
//case: one matrix element is of different datatype
//expected output: error
try {
  const x = arrayUtils.matrixMultiply(
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
  );
  console.log(`matrixMultiply Test Case 4 passed! Value Returned:\n ${x}`);
} catch (e) {
  console.log(`matrixMultiply Test Case 4 failed! Error: ${e.message}`);
}

//test cases for matrixMultiply
//case: one matrix is given
//expected output: error
try {
  const x = arrayUtils.matrixMultiply([
    [2, 3],
    [3, 4],
    [4, 5],
  ]);
  console.log(`matrixMultiply Test Case 5 passed! Value Returned:\n ${x}`);
} catch (e) {
  console.log(`matrixMultiply Test Case 5 failed! Error: ${e.message}`);
}

//test cases for matrixMultiply
//case: First matrix col length doesnot match row len of second matrix
//expected output: error
try {
  const x = arrayUtils.matrixMultiply(
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
  );
  console.log(`matrixMultiply Test Case 6 passed! Value Returned:\n ${x}`);
} catch (e) {
  console.log(`matrixMultiply Test Case 6 failed! Error: ${e.message}`);
}

//test cases for palindromes
//ideal every element is string and palindrome
//expected output { 'Maa!m': true, 'Hello234@$#@ ': false, 'Ma\tdam!@': true }
try {
  const x = stringUtils.palindromes(["Maa!m", "Hello234@$#@ ", "Ma	dam!@"]);
  console.log(
    `palindromes Test Case 1 passed! Value Returned:\n ${JSON.stringify(
      x,
      null,
      1
    )} `
  );
} catch (e) {
  console.log(`palindromes Test Case 1 failed! Error: ${e.message}`);
}

//test case for palindromes
//case: empty array is passed
//expected output Error
try {
  const x = stringUtils.palindromes([]);
  console.log(
    `palindromes Test Case 2 passed! Value Returned:\n ${JSON.stringify(
      x,
      null,
      1
    )} `
  );
} catch (e) {
  console.log(`palindromes Test Case 2 failed! Error: ${e.message}`);
}

//test case for palindromes
//case when one element is not palindrome
//expected output {madam: true, loot: false, wasitacatisaw: true, poordanisinadroop: true, anna: true, nope: false}
try {
  const x = stringUtils.palindromes([
    "Madam",
    "Loot",
    "Was it a cat I saw?",
    "Poor Dan is in a droop",
    "Anna",
    "Nope",
  ]);
  console.log(
    `palindromes Test Case 3 passed! Value Returned:\n ${JSON.stringify(
      x,
      null,
      1
    )} `
  );
} catch (e) {
  console.log(`palindromes Test Case 3 failed! Error: ${e.message}`);
}

//test case for palindromes
//case no element is passed
//expected output Error
try {
  const x = stringUtils.palindromes();
  console.log(
    `palindromes Test Case 4 passed! Value Returned:\n $${JSON.stringify(
      x,
      null,
      1
    )} `
  );
} catch (e) {
  console.log(`palindromes Test Case 4 failed! Error: ${e.message}`);
}

//test case for palindromes
//case: array element contains only non-alphanumeric characters
//expected output Error
try {
  const x = stringUtils.palindromes(["Madam", "!@"]);
  console.log(
    `palindromes Test Case 5 passed! Value Returned:\n ${JSON.stringify(
      x,
      null,
      1
    )} `
  );
} catch (e) {
  console.log(`palindromes Test Case 5 failed! Error: ${e.message}`);
}

//test cases for palindromes
//case: String contains only non-alpha Numeric character
//expected output : error
try {
  const x = stringUtils.palindromes(["Maa!m", "@ ", "Ma	dam!@"]);
  console.log(
    `palindromes Test Case 6 passed! Value Returned:\n ${JSON.stringify(
      x,
      null,
      1
    )} `
  );
} catch (e) {
  console.log(`palindromes Test Case 6 failed! Error: ${e.message}`);
}

//test cases for palindromes
//case: String is empty
//expected output : error
try {
  const x = stringUtils.palindromes(["Maa!m", " ", "Ma	dam!@"]);
  console.log(
    `palindromes Test Case 7 passed! Value Returned:\n ${JSON.stringify(
      x,
      null,
      1
    )} `
  );
} catch (e) {
  console.log(`palindromes Test Case 7 failed! Error: ${e.message}`);
}

//test cases for censorWords
//ideal test case
//expected output "I like !@$#! that has @$#!@$#!@ chips in it but I do not like lolli$#!s"
try {
  const x = stringUtils.censorWords(
    "I like bread that has chocolate chips in it but I do not like lollipops",
    ["bread", "chocolate", "pop"]
  );
  console.log(`censorWords Test Case 1 passed! Value Returned:\n ${x}`);
} catch (e) {
  console.log(`censorWords Test Case 1 failed! Error: ${e.message}`);
}

//test cases for censorWords
//case when all badwords are not present in string
//expected output: error

try {
  const x = stringUtils.censorWords(
    "I like bread that has chocolate chips in it but I do not like lollipops",
    ["bread", "chocolate", "pop", "the"]
  );
  console.log(`censorWords Test Case 2 passed! Value Returned:\n ${x}`);
} catch (e) {
  console.log(`censorWords Test Case 2 failed! Error: ${e.message}`);
}

//test cases for censorWords
//case when there is number in string are not present in string
//expected output: Error

try {
  const x = stringUtils.censorWords(
    "I like bread that has chocolate chips in it but I do not like lollipops",
    ["bread", 1, "pop"]
  );
  console.log(`censorWords Test Case 3 passed! Value Returned:\n ${x}`);
} catch (e) {
  console.log(`censorWords Test Case 3 failed! Error: ${e.message}`);
}

//test case for combineObjects
//case 1: expected output: {a:3,d:4}
//
try {
  const x = objectUtils.combineObjects(
    { a: 3, b: 7, c: 5 },
    { d: 4, e: 9 },
    { a: 8, d: 2 }
  );
  console.log(
    `combineObjects Test Case 1 passed! Value Returned:\n ${JSON.stringify(
      x,
      null,
      1
    )} `
  );
} catch (e) {
  console.log(`combineObjects Test Case 1 failed! Error: ${e.message}`);
}

//test case for combineObjects
//case 2: expected output: { a: { sA: 'Hello', sB: 'There', sC: 'Class' }, c: true, d: 'Test' }
//
try {
  const x = objectUtils.combineObjects(
    {
      a: { sA: "Hello", sB: "There", sC: "Class" },
      b: 7,
      c: true,
      d: "Test",
    },
    { a: 2, c: 3 },
    { f: 8, d: 2 }
  );
  console.log(
    `combineObjects Test Case 2 passed! Value Returned:\n ${JSON.stringify(
      x,
      null,
      1
    )} `
  );
} catch (e) {
  console.log(`combineObjects Test Case 2 failed! Error: ${e.message}`);
}

//test case for combineObjects
//case 3: expected output: { c: true, d: 'Test' }
//
try {
  const x = objectUtils.combineObjects(
    {
      " a": 0,
      b: 7,
      c: true,
      d: "Test",
    },
    { a: 2, c: 3 },
    { f: 8, d: 2 }
  );
  console.log(
    `combineObjects Test Case 3 passed! Value Returned:\n ${JSON.stringify(
      x,
      null,
      1
    )} `
  );
} catch (e) {
  console.log(`combineObjects Test Case 3 failed! Error: ${e.message}`);
}

//testcase for areObjectsEqual
// case 1: Ideal all objects value are equal
//expected output: true
try {
  const x = objectUtils.areObjectsEqual(
    { a: 2, b: 3 },
    { a: 2, b: 3 },
    { b: 3, a: 2 }
  );
  console.log(`areObjectsEqual Test Case 1 passed! Value Returned: ${x}`);
} catch (e) {
  console.log(`areObjectsEqual Test Case 1 failed! Error: ${e.message}`);
}

//testcase for areObjectsEqual
//case 2: nested Objects are equal
//expected output: true
try {
  const x = objectUtils.areObjectsEqual(
    {
      name: { firstName: "Patrick", lastName: "Hill" },
      age: 47,
      dob: "9/25/1975",
      hobbies: ["Playing music", "Movies", "Spending time with family"],
    },
    {
      age: 47,
      name: { firstName: "Patrick", lastName: "Hill" },
      hobbies: ["Playing music", "Movies", "Spending time with family"],
      dob: "9/25/1975",
    },
    {
      name: { firstName: "Patrick", lastName: "Hill" },
      age: 47,
      dob: "9/25/1975",
      hobbies: ["Playing music", "Movies", "Spending time with family"],
    }
  );
  console.log(`areObjectsEqual Test Case 2 passed! Value Returned: ${x}`);
} catch (e) {
  console.log(`areObjectsEqual Test Case 2 failed! Error: ${e.message}`);
}

//test case for arObjectEqual
//case 3: empty object is passed
//expected output: true
try {
  const x = objectUtils.areObjectsEqual({}, {}); // throws error
  console.log(`areObjectsEqual Test Case 3 passed! Value Returned: ${x}`);
} catch (e) {
  console.log(`areObjectsEqual Test Case 3 failed! Error: ${e.message}`);
}

//test case for arObjectEqual
//case 4: array are passed as input
//expected output: Error
try {
  const x = objectUtils.areObjectsEqual([1, 2, 3], [1, 2, 3]); // throws error
  console.log(`areObjectsEqual Test Case 4 passed! Value Returned: ${x}`);
} catch (e) {
  console.log(`areObjectsEqual Test Case 4 failed! Error: ${e.message}`);
}

//test case for arObjectEqual
//case 5: array along with object are passed as input
//expected output: Error
try {
  const x = objectUtils.areObjectsEqual(
    { a: 2, b: 3 },
    { a: 2, b: 3 },
    [2, 2, 3],
    [1, 2, 3]
  ); // throws error
  console.log(`areObjectsEqual Test Case 5 passed! Value Returned: ${x}`);
} catch (e) {
  console.log(`areObjectsEqual Test Case 5 failed! Error: ${e.message}`);
}

//test case for areObjectsEqual
//case 6: Only one object is passed
//expected output: Error
try {
  const x = objectUtils.areObjectsEqual({ a: 2, b: 3 }); // throws error
  console.log(`areObjectsEqual Test Case 6 passed! Value Returned: ${x}`);
} catch (e) {
  console.log(`areObjectsEqual Test Case 6 failed! Error: ${e.message}`);
}

//test case for calculateObject
//case1 excepted output:{ a: '2.45', b: '3.74', c: '3.16' }
try {
  const x = objectUtils.calculateObject({ a: 3, b: 7, c: 5 }, [
    (n) => n * 2,
    (n) => Math.sqrt(n),
  ]);
  console.log(
    `calculateObject Test Case 1 passed! Value Returned:\n ${JSON.stringify(
      x,
      null,
      1
    )} `
  );
} catch (e) {
  console.log(`calculateObject Test Case 1 failed! Error: ${e.message}`);
}

//test case for calculateObject
//case2: input contains string
//excepted output: error
try {
  const x = objectUtils.calculateObject({ a: "s", b: "s", c: "s" }, [
    (n) => n * 2,
    (n) => Math.sqrt(n),
  ]);
  console.log(
    `calculateObject Test Case 2 passed! Value Returned:\n ${JSON.stringify(
      x,
      null,
      1
    )} `
  );
} catch (e) {
  console.log(`calculateObject Test Case 2 failed! Error: ${e.message}`);
}

//test case for calculateObject
//case3: input contains NaN
//excepted output: error
try {
  const x = objectUtils.calculateObject({ a: 3, b: 7, c: NaN }, [
    (n) => n * 2,
    (n) => Math.sqrt(n),
  ]);
  console.log(
    `calculateObject Test Case 3 passed! Value Returned:\n ${JSON.stringify(
      x,
      null,
      1
    )} `
  );
} catch (e) {
  console.log(`calculateObject Test Case 3 failed! Error: ${e.message}`);
}

//test case for calculateObject
//case4: No function parameter passed
//excepted output: error
try {
  const x = objectUtils.calculateObject({ a: 3, b: 7, c: 5 }, []);
  console.log(
    `calculateObject Test Case 4 passed! Value Returned:\n ${JSON.stringify(
      x,
      null,
      1
    )} `
  );
} catch (e) {
  console.log(`calculateObject Test Case 4 failed! Error: ${e.message}`);
}

//test case for calculateObject
//case5: improper value passed in function
//excepted output: error
try {
  const x = objectUtils.calculateObject({ a: 3, b: 7, c: 5 }, [true]);
  console.log(
    `calculateObject Test Case 5 passed! Value Returned:\n ${JSON.stringify(
      x,
      null,
      1
    )} `
  );
} catch (e) {
  console.log(`calculateObject Test Case 5 failed! Error: ${e.message}`);
}

///test case for distance
//case1: ideal case
try {
  const x = stringUtils.distance(
    "The brown fox jumped over the lazy dog",
    "fox",
    "dog"
  );
  console.log(
    `distance() Test Case 1 Passed Successfully Value returned: ${x}`
  );
} catch (e) {
  console.log(`distance() Test Case 1 Falied message: ${e.message}`);
}

///test case for distance
//case2: ideal case
try {
  const x = stringUtils.distance(
    "I was going to buy workout powder yesterday",
    "going to",
    "workout powder"
  );
  console.log(
    `distance() Test Case 2 Passed Successfully Value returned: ${x}`
  );
} catch (e) {
  console.log(`distance() Test Case 2 Falied message: ${e.message}`);
}

//test case for distance
//case3:
try {
  const x = stringUtils.distance(
    "I really hope it will snow soon because snow is my favorite and I am looking forward to it!",
    "I",
    "snow"
  );
  console.log(
    `distance() Test Case 3 Passed Successfully Value returned: ${x}`
  );
} catch (e) {
  console.log(`distance() Test Case 3 Falied message: ${e.message}`);
}

//test case for distance
//case4:
try {
  const x = stringUtils.distance(
    "sphinx of black quartz, judge my vow",
    "QUARTZ",
    "vOW"
  );
  console.log(
    `distance() Test Case 4 Passed Successfully Value returned: ${x}`
  );
} catch (e) {
  console.log(`distance() Test Case 4 Falied message: ${e.message}`);
}

//test case for distance
//case5: same word1 and word2
//expected output: error
try {
  const x = stringUtils.distance("Patrick", "Patrick", "Patrick");
  console.log(
    `distance() Test Case 5 Passed Successfully Value returned: ${x}`
  );
} catch (e) {
  console.log(`distance() Test Case 5 Falied message: ${e.message}`);
}

//test case for distance
//case6: words are not present in String
//expected output: error
try {
  const x = stringUtils.distance("Give me music suggestions", "rock", "pop");
  console.log(
    `distance() Test Case 6 Passed Successfully Value returned: ${x}`
  );
} catch (e) {
  console.log(`distance() Test Case 6 Falied message: ${e}`);
}

//test case for distance
//case7: words are non-alphanumeric character
//expected output: error
try {
  const x = stringUtils.distance("Hello World!", "   !?!", "    ...  ");
  console.log(
    `distance() Test Case 7 Passed Successfully Value returned: ${x}`
  );
} catch (e) {
  console.log(`distance() Test Case 7 Falied message: ${e}`);
}

//test case for distance
//case8: words are non-alphanumeric character
//expected output: error
try {
  const x = stringUtils.distance(
    "I was going to buy preworkout powder yesterday",
    "going to",
    "workout powder"
  );
  console.log(
    `distance() Test Case 8 Passed Successfully Value returned: ${x}`
  );
} catch (e) {
  console.log(`distance() Test Case 8 Falied message: ${e}`);
}
