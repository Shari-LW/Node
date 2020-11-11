let express = require("express");
let app = express();
let path = require("path");
const fs = require("fs");
const { allowedNodeEnvironmentFlags } = require("process");
const { profile } = require("console");

// ASSESSMENT

// 1. Create a GET request to respond with the contents of the profiles.json file

// 2. Create a GET request with an :id parameter and use it to respond with the profile object which
//ends with the same number e.g. for 1 return object which key is “profile1” in profile.json

// 3. Create a PUT request which will append another new profile at the end of the file

// 1.

app.get("/api/profiles", (_, res) => {
  fs.readFile(
    path.join(__dirname, "models", "profiles.json"),
    "utf-8",
    function (_, data) {
      console.log(data);
      res.send(data);
    }
  );
});

// 2.

app.get("/homework/profile/:id", (req, res) => {
  fs.readFile("models/profiles.json", "utf-8", (err, data) => {
    let id = req.params.id;
    let text = JSON.parse(data);
    res.send(text["profile" + id]);
  });
});

// 3.

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.raw());

app.put("/api/profiles/", (req, res) => {
  console.log(req.body);
  let text = JSON.stringify(req.body);
  fs.appendFile("models/profiles.json", text, (err, data) => {
    if (err) {
      return "Cannot write" + data;
    }
  });
  res.send("Well done, you did it!");
});

const server = app.listen(5000, function () {
  console.log("Node server is running http://localhost:5000 ...");
});
