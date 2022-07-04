// require("dotenv").config();

const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const joi = require("joi");
const connection = require("./db-config");

const app = express();
app.use(express.json());

app.use(cors());

app.use((req, res, next) => {
  const allowedOrigins = ["localhost"];
  const { origin } = req.headers;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  return next();
});
// res.header("Access-Control-Allow-Methods", "GET, POST");
// res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
// res.header("Access-Control-Allow-Credentials", true);

dotenv.config();

const port = process.env.PORT || 5000;
const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com" /* change the host depending the mail provider */,
  port: 587 /* same */,
  secureConnection: false,
  tls: {
    ciphers: "SSLv3",
    rejectUnauthorized: false,
  },
  auth: {
    user: "etienne.duret@outlook.fr" /* ADD YOUR MAIL  */,
    pass: "" /* ADD YOUR PASSWORD */,
  },
});
transporter.verify(function (error, success) {
  if (error) {
    console.error(error);
  } else {
    console.warn(success, "Server is ready to take our messages");
  }
});
app.post("/createProvider", (req, res) => {
  const { title } = req.body;
  const { mobile } = req.body;
  const { email } = req.body;
  const { price } = req.body;
  connection.query(
    "INSERT INTO providers (title, mobile, email, price) VALUE (?, ? ,?, ?)",
    [title, mobile, email, price],
    (err, result) => {
      if (err) {
        console.error(err);
      } else {
        res.status(201).send(result);
      }
    }
  );
});

app.get("/ProviderList", (req, res) => {
  connection.query("SELECT * FROM providers", (err, result) => {
    if (err) {
      console.error(err);
    } else {
      res.json(result);
    }
  });
});

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
  const { error } = joi
    .object({
      title: joi.string().max(255).required(),
      texte: joi.string().max(10000).required(),
    })
    .validate({ title, texte }, { abortEarly: false });
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

// CONTACT INVITATION

app.post("/contact", (req, res) => {
  const { name } = req.body;
  const { email } = req.body;
  const { message } = req.body;
  connection.query(
    "INSERT INTO talker (name, email, message) VALUE (?, ?, ?)",
    [name, email, message],
    (err, result) => {
      if (err) {
        res.status(500).send("Error sending message");
      } else {
        res.status(201).send(result);
      }
    }
  );
});

// CHECK if some asked for invitation
app.get("/contact", (req, res) => {
  connection.query("SELECT * FROM talker", (err, result) => {
    if (err) {
      res.status(500).send("Error getting talkers");
    } else {
      res.json(result);
    }
  });
});

app.post("/contact/:id", (req, res) => {
  const talkerId = req.params.id;
  // fetch user from db using id
  connection.query(
    `SELECT * from talker where id = ${talkerId}`,
    (err, result) => {
      if (err) {
        res.status(500).send("Error fetching this talker");
      } else if (result[0]) {
        // MAIL
        const emails = result[0].email;
        // Create mail
        const mailOptions = {
          from: "etienne.duret@outlook.fr",
          to: emails,
          subject: "Hello",
          text: "text",
          html: "<html><body><h1>SEND FROM VS CODE</h1></body></html>",
        };
        // Send the mail
        // eslint-disable-next-line consistent-return
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.warn("Email error:", error);
            return res.status(500).send("Error sending email");
          }
          // delete user
          connection.query(
            "DELETE FROM talker WHERE id = ?",
            [talkerId],
            (deleteError, deleteResult) => {
              if (deleteError) {
                res.status(500).send("Error deleting this talker");
              } else if (deleteResult.affectedRows) {
                res.status(200).send("🎉 talker deleted!");
              } else res.status(404).send("talker not found");
            }
          );
          console.warn("Message sent: ", info);
        });
      } else res.status(404).send("talker not found");
    }
  );
});

app.listen(port, (error) => {
  connection.connect((err) => {
    if (err) {
      console.error(`error connecting: ${err.stack}`);
    } else console.error(error);
  });
});
