//require("dotenv").config();
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const port = parseInt(process.env.APP_PORT ?? "5000", 10);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    // eslint-disable-next-line no-restricted-syntax
    console.log(`Server is listening on ${port}`);
  }
});
