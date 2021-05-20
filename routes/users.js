const csv = require("csv-parser");
const fs = require("fs");
const express = require("express");
const router = express.Router();
const { checkUsers, createMeta } = require("../helpers");
const { geoJSONify } = require("../geo-helpers");
const session = require("express-session");

const app = express();
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

// /users?gender=f&dist=100&origin=37.774929,-122.419416&min_age=21&max_age=29

app.get("/users", async (req, res) => {
  const {
    gender,
    dist,
    origin,
    min_age,
    max_age,
    limit = 3,
    page = 1,
  } = req.query;

  const geoJSON = createMeta(gender, dist, origin, min_age, max_age);
  console.log("///////////////////////");
  console.log(req.session.validUsers);
  console.log("///////////////////////");
  (async () => {
    let users = [];
    await fs
      .createReadStream("../users.csv")
      .pipe(csv({}))
      .on("data", (data) => users.push(data))
      .on("end", () => {
        let validUsers = checkUsers(
          gender,
          dist,
          origin,
          min_age,
          max_age,
          users
        );
        req.session.validUsers = validUsers;

        let JSONOutput = geoJSONify(geoJSON, validUsers);
        console.log(JSONOutput);

        return res.send(JSONOutput);
      });
  })();
});

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`);
});
