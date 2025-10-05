const express = require("express");
const users = require("./MOCK_DATA.json"); //*taking the data from json file (as we don't have a database yet)
const app = express();
const fs = require("fs");

//* connecting to the database using mongoose
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/firstdb-youtube")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

//schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    jobTitle: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true }
);

//model
const User = mongoose.model("user", userSchema);

//*MIDDLEWARES
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    ` \n ${new Date().toISOString()} ::  ${req.url} : ${req.ip}  \n`,
    (err, data) => {
      next();
    }
  );
});

app.use((req, res, next) => {
  console.log("hello from middleware  2 ");
  // req.myUserName = "Manav";
  next();
});

const port = 8000;

//ROUTES
app.get("/users", async (req, res) => {
  //* similarly we are using our mongodb - mongoose to fetch all the users from the database not from the json file

  const allDbUsers = await User.find({});

  const html = ` 
  <ul> 
   ${allDbUsers
     .map((user) => `<li> ${user.firstName} - ${user.email} </li> `)
     .join("")}
  </ul>
  `;
  res.send(html);
});

//API ROUTE
app.get("/api/users", async (req, res) => {
  const allDbUsers = await User.find({});
  // console.log(req.myUserName);
  res.setHeader("MyName", "Manav Sheth");
  console.log(req.headers);

  return res.json(allDbUsers);
});

/*  
//*so this was the API ROUTE we sat for all methods (GET, POST, PATCH, DELETE) but you see
//*GET, PATCH AND DELETE have a common thing that we are having a same path parameter /api/users/:id 
//*so instead of writing 3 different routes for them we can use app.route() method which will help us to chain the methods with same path parameter

app.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const user = users.find((user) => user.id === Number(id));
  return res.json(user);
});

app.patch("/api/users/:id", (req, res) => {
  //*Todo: update the user with id = id
  return res.json({ status: "pending" });
});

app.delete("/api/users/:id", (req, res) => {
    //*Todo: delete the user with id = id
  return res.json({ status: "pending" });
});


app.post("/api/users", (req, res) => {
  //*Todo: create a new user
  return res.json({ status: "pending" });
});

*/

//* chaining the methods with same path parameter.
//:id is a path parameter which will be dynamic to find all the users with different ids

app
  .route("/api/users/:id")
  .get(async (req, res) => {
    // const id = Number(req.params.id);
    // const user = users.find((user) => user.id === id);
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json(user);
  })
  .patch(async (req, res) => {
    // Update the user with id = id
    await User.findByIdAndUpdate(req.params.id, {
      lastName: "Changed",
    });
    return res.status(200).json({ msg: "success" });

    //const id = Number(req.params.id);
    // const userIndex = users.findIndex((user) => user.id === id);
    // if (userIndex === -1) {
    // return res.status(404).json({ error: "User not found" });
    // }
    // Update user fields with request body
    // users[userIndex] = { ...users[userIndex], ...req.body };
    //* Persist changes to file
    // fs.writeFile("MOCK_DATA.json", JSON.stringify(users), (err) => {
    //   if (err) {
    //     return res.status(500).json({ error: "Failed to update user" });
    //   }
    //   return res.json(users[userIndex]);
    // });
  })
  .delete(async (req, res) => {
    //Todo: delete the user with id = id

    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({ msg: "success" });
    // const id = Number(req.params.id);
    // const userIndex = users.findIndex((user) => user.id === id);
    // if (userIndex === -1) {
    //   return res.status(404).json({ error: "User not found" });
    // }
    // users.splice(userIndex, 1); //? 1 is used to delete only one element from that index
    // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    //   return res.send({ status: "success" });
    // });
  });

app.post("/api/users", async (req, res) => {
  //Todo: create a new user
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  //* creating a new user in the database using mongoose
  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    jobTitle: body.job_title,
    gender: body.gender,
  });
  // console.log(result);
  return res.status(201).json({ status: "success" });

  // const newUser = { ...body, id: users.length + 1 };
  // users.push({ ...body, id: users.length + 1 }); //? we are not using stringfy coz we are puushing the code javacript in memory so it should be in object format not in string format while we use in the writeFile method coz we are storing in the disk.

  //? ALso we can even wrote only body in inside the push method but by that the id will not be added to the new user object so for that we can use the spread operator to add the id property to the new user object

  //? we wrote this coz we need to push our data to the existing array of objects file that we have , instead if we use the fs.appendFile method it will add the data at the end of the file and it will not be in the form of array of objects. we need to add the data before the closing square bracket of the array of objects. ']'
  // fs.writeFile("MOCK_DATA.json", JSON.stringify(users), (err, data) => {
  //   return res.status(201).json({ status: "success", id: users.length });
  // });

  //? Moreover we also need to update the file not just in the Ram but we also need to locally so when the server restarts we have the data  there so for that we use the fs module of node js
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
