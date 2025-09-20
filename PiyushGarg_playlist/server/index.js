//? require http module from node js to create a server (older way)
// const http = require("http");
// //? create a log file for every request made to the server
// const fs = require("fs");

// //? to seperate the url and query params
// const url = require("url");

//? require express (newer way)
const express = require("express");

//* older version of creating a server with just node js and no express (with all the callbacks and conditions)
// function myHandler(req, res) {
//   if (req.url === "/favicon.ico") {
//     // to ignore the favicon requests made by the browser
//     return res.end();
//   }
//   // console.log("Request made from browser to server", req); // this gives the whole request object
//   //to get the method and url of the request
//   const log = ` ${Date.now()}: ${req.method} ${
//     req.url
//   }: New Request Received \n`;
//   const myUrl = url.parse(req.url, true);
//   console.log(myUrl);
//   //appendFile will create the file asynchronously (non blocking)
//   fs.appendFile("log.txt", log, (err, data) => {
//     switch (myUrl.pathname) {
//       case "/":
//         if (req.method === "GET") res.end("Home Page");
//         break;
//       case "/about":
//         const username = myUrl.query.myname;
//         res.end(`Hi, ${username} `);
//         break;
//       case "/search":
//         const search = myUrl.query.search_query;
//         res.end(`You searched for: ${search} `);
//         break;
//       case "/contact":
//         res.end("Contact me at: +1234567890");
//         break;
//       case "/signup":
//         if (req.method === "GET") res.end("Signup Page");
//         else if (req.method === "POST")
//           //Db logic to add user to the database
//           res.end("User Signed Up Successfully");
//       default:
//         res.end("404 Page Not Found");
//     }
//   });
// }

//* creating a server with express (new and improved way)

const app = express();

app.get("/", (req, res) => {
  return res.send("Home Page");
});
app.get("/about", (req, res) => {
  return res.send(`Hi, ${req.query.myname} `);
});

//* older way of creating a server using the http module
// const myServer = http.createServer(app);
// myServer.listen(8000, () => {
//   console.log("Server Started at port 8000! ");
// });

//* newer way of creating a server using express
app.listen(8000, () => {
  console.log("Server Started at port 8000! ");
});
