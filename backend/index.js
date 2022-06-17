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

const port = process.env.PORT || 5000;

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

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/blogs", (req, res) => {
  let sql = "SELECT * FROM blogs";
  const sqlValues = [];
  if (req.query.title) {
    sql += " WHERE title = ?";
    sqlValues.push(req.query.title);
  }

  connection.query(sql, sqlValues, (err, results) => {
    if (err) {
      res.status(500).send("Error retrieving blogs from database");
    } else {
      res.json(results);
    }
  });
});

app.get("/blogs/:id", (req, res) => {
  const blogsId = req.params.id;
  connection.query(
    "SELECT * FROM blogs WHERE id = ?",
    [blogsId],
    (err, results) => {
      if (err) {
        res.status(500).send("Error retrieving blogs from database");
      } else if (results.length) res.json(results[0]);
      else res.status(404).send("blogs not found");
    }
  );
});

app.post("/blogs", (req, res) => {
  const { title, texte } = req.body;
  const { error } = Joi.object({
    title: Joi.string().max(255).required(),
    texte: Joi.string().max(10000).required(),
  }).validate({ title, texte }, { abortEarly: false });
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    connection.query(
      "INSERT INTO blogs (title, texte) VALUES (?, ?)",
      [title, texte],
      (err, result) => {
        if (err) {
          res.status(500).send("Error saving the blog");
        } else {
          const id = result.insertId;
          const createdBlog = { id, title, texte };
          res.status(201).json(createdBlog);
        }
      }
    );
  }
});

app.put("/blogs/:id", (req, res) => {
  const blogsId = req.params.id;
  const db = connection.promise();
  let existingBlog = null;
  db.query("SELECT * FROM blogs WHERE id = ?", [blogsId])
    .then(([results]) => {
      // eslint-disable-next-line prefer-destructuring
      existingBlog = results[0];
      // eslint-disable-next-line prefer-promise-reject-errors
      if (!existingBlog) return Promise.reject("RECORD_NOT_FOUND");
      return db.query("UPDATE movies SET ? WHERE id = ?", [req.body, blogsId]);
    })
    .then(() => {
      res.status(200).json({ ...existingBlog, ...req.body });
    })
    .catch((err) => {
      console.error(err);
      if (err === "RECORD_NOT_FOUND")
        res.status(404).send(`blog with id ${blogsId} not found.`);
      else res.status(500).send("Error updating a blog.");
    });
});

app.delete("/blogs/:id", (req, res) => {
  const blogsId = req.params.id;
  connection.query(
    "DELETE FROM blogs WHERE id = ?",
    [blogsId],
    (err, result) => {
      if (err) {
        res.status(500).send("Error deleting a blog");
      } else if (result.affectedRows) res.status(200).send("🎉 blog deleted!");
      else res.status(404).send("blog not found");
    }
  );
});

// MAIL

// SEND A MAIL

const nodemailer = require("nodemailer");

// Create sender
const transporter = nodemailer.createTransport({
  host: "smtp.mailfence.com" /* change the host depending the mail provider */,
  port: 465 /* same */,
  auth: {
    user: "etienne.duret@mailfence.com" /* ADD YOUR MAIL  */,
    pass: "ADD YOUR PASSWAORD HERE",
  },
});

// Verify port
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

// Create mail

const mailOptions = {
  from: "etienne.duret@mailfence.com",
  to: "asathal.pierre@gmail.com",
  subject: "Hello Lucie",
  text: "text",
  html: "<body><h1>HTML</h1></body>",
};

// Send the mail
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log("Message sent: ", info);
});

// CONTACT INVITATION

app.get("/form", (req, res) => res.render("form")); //Check what it is
app.post("/contact", (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;
  connection.query(
    "INSERT INTO NewTableName (name, email, message) VALUE (?, ?, ?)",
    [name, email, message],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(201).send(result);
      }
    }
  )
  res.status(201).json({"response":"data received"})
});

app.use((req, res) => res.status(404)); // check if needed
app.use((err, req, res, next) => res.status(500)); // check if needed





app.listen(port, (err) => {
  console.log(`Server listening on port ${port}`);
  connection.connect((err) => {
    if (err) {
      console.error(`error connecting: ${err.stack}`);
    }
  });
});
