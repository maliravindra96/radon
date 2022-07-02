const express = require("express");
const app = express();
// dotenv file require
require("dotenv").config();
// my port number
const port = process.env.PORT;
// require mongoose library
const mongoose = require("mongoose");

//middleware
app.use(express.json());
app.use(require("./Router/route"));

//mongoose connect

mongoose
  .connect(process.env.MONGODATABASE, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connected");
  })
  .catch((error) => {
    console.log("not connected");
  });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
