const express = require("express");
const cors = require("cors");
const postgresPool = require("pg");
const bodyParser = require("body-parser");

const app = express();
const colors = require("colors");

const PORT = process.env.PORT || 5001;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, (err) => {
  if (err) throw error;
  console.log(`Server running on port ${PORT}`.rainbow);
});
