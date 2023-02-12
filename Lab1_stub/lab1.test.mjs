import * as lab1 from "./lab1.mjs";
//TODO: Write and call each function in lab1.js 5 times each, passing in different input

console.log(lab1.questionOne([-1, 0, 0])); //edge case if sum of cubes of elements is negative output should be  {'-1': false}
console.log(lab1.questionOne([1, 0, 0])); //edge case if sum of cubes of elements is 1 output should be  {'1': false}
console.log(lab1.questionOne([5, 3, 10])); // Returns and then outputs {'1152': false}
console.log(lab1.questionOne([2, 1, 2])); // Returns and then outputs {'17': true}
console.log(lab1.questionOne([512, 1007, 17389])); //Returns and then outputs {'5259194599940': false}
console.log(lab1.questionOne([0, 14159, 785])); //Returns and then outputs {'2839041558304', false}
console.log(lab1.questionOne([11, 4])); //Returns and then outputs {'1395': false}

// Question 2 test cases
console.log(lab1.questionTwo([-1, 2, 3, 3]));
console.log(lab1.questionTwo([1, 2, 4, 3]));
console.log(lab1.questionTwo([10, 7, 6, 11]));
console.log(lab1.questionTwo([-1, 0, 0, 1, 1, 1, 3, 5])); //edge case if there are two or more than two similar elements
console.log(lab1.questionTwo([1, 2, 2, 2, 0])); //edge case if there are two or more than two similar elements

//Question 3 test cases
console.log(lab1.questionThree({ a: 1, b: 2, c: 3 }, { c: 10, a: 20, b: 30 })); // Returns and then outputs {a:true, b:true, c:true}
console.log(lab1.questionThree({}, { c: 10, a: 20, b: 30 })); // Returns and then outputs {a:false, b:false, c:false}

console.log(
  lab1.questionThree(
    { a: 1, b: 2, c: 3, d: 4 },
    { f: 10, b: 20, e: 30, d: 40, c: 50, a: 60 }
  )
); // Returns and then outputs {a:true, b:true, c:true, d:true, e:false, f:false}

console.log(
  lab1.questionThree(
    { foo: "I'm foo", bar: "I'm bar", fizz: "I'm fizz", buzz: "I'm buzz" },
    {
      fizz: "I'm not buzz",
      foo: "I'm not bar",
      buzz: "I'm not fizz",
      bar: "I'm not foo",
      c: 50,
      a: 60,
    }
  )
); // Returns and then outputs {foo:true, bar: true, fizz: true, buzz: true, c:false, a:false}

console.log(
  lab1.questionThree(
    { a: 10, b: 20, c: 30, d: 40, e: 50, f: 60 },
    { a: 1, b: 2, c: 3 }
  )
); //Returns and then outputs {a: true, b: true, c:true, d: false, e: false, f: false}

///Question 4 test cases
//ideal input string case
console.log(
  lab1.questionFour(`Patrick,Hill,cs546
Jared,Bass,cs115
Shudong,Hao,cs570`)
);

//case where string contains '\t'
console.log(
  lab1.questionFour(`
  Patrick,Hill,cs546
  Jared,Bass,cs115
  Priyank,Thakur, CS546 
  Shudong,Hao,cs570`)
);

//case where string contains BLANK character in begining and after ','
console.log(
  lab1.questionFour(`
  Patrick,Hill,cs546
Jared,  Bass,cs115
 Priyank, Thakur, CS546 
Shudong, Hao,cs570`)
);

//case with empty line in between string
console.log(
  lab1.questionFour(`Patrick,Hill,cs546
Jared,Bass,cs115
 Priyank, Thakur,CS546 

Shudong,Hao,cs570`)
);

//case when empty object is returned
console.log(lab1.questionFour()); //should return empty array
