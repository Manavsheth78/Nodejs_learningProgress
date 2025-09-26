const express = require("express");
const users = require("./MOCK_DATA.json"); //*taking the data from json file (as we don't have a database yet)
const app = express();

const port = 8000;

//ROUTES
app.get("/users", (req, res) => {
  const html = ` 
  <ul> 
   ${users.map((user) => `<li> ${user.first_name} </li> `).join("")}
  </ul>
  `;
  res.send(html);
});

//API ROUTE
app.get("/api/users", (req, res) => {
  return res.json(users);
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

//* chaining the methods with same path parameter
//:id is a path parameter which will be dynamic to find all the users with different ids

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    //Todo: update the user with id = id
    return res.json({ status: "pending" });
  })
  .delete((req, res) => {
    //Todo: delete the user with id = id
    return res.json({ status: "pending" });
  });

app.post("/api/users", (req, res) => {
  //Todo: create a new user
  return res.json({ status: "pending" });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
