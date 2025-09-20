// const Math = require("./math");

// console.log("hey, i am using nodejs in the javascript!");

// //#  I am using the nodejs enviromnet and then run that code in the terminal using the command "node hello.js"

// // console.log(add(2, 3));

// console.log("math value is ", Math.addFn(2, 4));
// console.log("math value is ", Math.subFn(2, 4));

//------------------------------------

// Destructuring the object directly while importing
const math = require("./math");

const { add, sub, add1, sub1 } = require("./math");

console.log("hey, i am using nodejs in the javascript!");

//#  I am using the nodejs enviromnet and then run that code in the terminal using the command "node hello.js"

// console.log(add(2, 3));

console.log(math);
console.log("math value is ", add(2, 4));
console.log("math value is ", sub(2, 4));
console.log("math value is ", add1(2, 4));
console.log("math value is ", sub1(2, 4));

//output:
// hey, i am using nodejs in the javascript!
// {
//   add: [Function: add],
//   sub: [Function: sub2],
//   add1: [Function (anonymous)],
//   sub1: [Function (anonymous)]
// }
