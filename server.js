const express = require("express");
const mongodb = require("./db/connect");
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/", require("./routes"));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Connected to DB and listening on port ${port}`);
    });
  }
});
