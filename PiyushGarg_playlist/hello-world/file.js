const { log } = require("console");
const fs = require("fs");

// const os = require("os");
// console.log(os.cpus().length);

//* write Sync Call..
// fs.writeFileSync("./hello.txt", " Learning Node.js");

//* write Async Call..

// fs.writeFile("./hello1.txt", " Learning Node.js Async ", (err) => {});

//* read file Sync

// const data = fs.readFileSync("./hello.txt", "utf-8");
// console.log(data);

//* Async read file

// const data1 = fs.readFile("./hello1.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });
//console.log("data"); //? the data is comming from the last else statement of the async call
// console.log(data1); // it will give undefined because it is async call

//* append file sync

// fs.appendFileSync(
//   "./hello.txt",
//   `\n ${new Date().getDate().toLocaleString()} \n `
// );

//* copy file sync
// fs.cpSync("./hello.txt", "./copytest.txt");

//* delete (unlink sync)

// fs.unlinkSync("./copytest.txt");

//* status check of the file
// console.log(fs.statSync("./hello.txt").isDirectory());

//* converting a code from blocking to non blocking to understand the architecture of node js

// console.log("start");

// const result = fs.readFileSync("./hello.txt", "utf-8");
// console.log(result);

// console.log("end");
// //?  in the above code the readFileSync is blocking the event loop until it reads the file and then only it will go to the next line

// //* now non blocking code

// console.log("start");

// fs.readFile("./hello.txt", "utf-8", (err, res) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(res);
//   }
// });

// console.log("end");
// //? in the above code the readFile is non blocking so it will not wait for the file to be read and it will go to the next line and print end first and then it will print the file content when it is read completely
