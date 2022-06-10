//require("dotenv").config();
const connection = require("./db-config");
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());

app.use(cors());
app.use((req, res, next) => {
  const allowedOrigins = ["localhost"];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  return next();
});
//res.header("Access-Control-Allow-Methods", "GET, POST");
//res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//res.header("Access-Control-Allow-Credentials", true);

dotenv.config();

const port = parseInt(process.env.APP_PORT ?? "5000", 10);

app.post("/createProvider", (req, res) => {
  const title = req.body.title;
  const mobile = req.body.mobile;
  const email = req.body.email;
  const price = req.body.price;
  connection.query(
    "INSERT INTO providers (title, mobile, email, price) VALUE (?, ? ,?, ?)",
    [title, mobile, email, price],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(201).send(result);
      }
    }
  );
});

app.get("/ProviderList", (req, res) => {
  connection.query("SELECT * FROM providers", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});
/* 
app.put("/api/providers/:id", (req, res) => {
  const providerId = req.params.id;
  const providerPropsToUpdate = req.body;
  connection.query(
    "UPDATE providers SET ? WHERE id = ?",
    [providerPropsToUpdate, providerId],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
}); */

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    // eslint-disable-next-line no-restricted-syntax
    console.log(`Server is listening on ${port}`);
  }
});
