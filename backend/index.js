// require("dotenv").config();

const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");

const nodemailer = require("nodemailer");
const Joi = require("joi");

const argon2 = require("argon2");

const app = express();
app.use(express.json());
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode"); // eslint-disable-line
const connection = require("./db-config");

const db = connection.promise();
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

dotenv.config();
process.on("unhandledRejection", (error) => {
  console.error("unhandledRejection", error);
});

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
    user: process.env.MAIL /* ADD YOUR MAIL  */,
    pass: process.env.MAILPASS /* ADD YOUR PASSWORD */,
  },
});
transporter.verify(function (error, success) {
  if (error) {
    console.error(error);
  } else {
    console.warn(success, "Server is ready to take our messages");
  }
});

//TEST ROUTE:
app.get("/", (req, res) => {
  res.json({ status: "up" });
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

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashPassword = (plainPassword) => {
  return argon2.hash(plainPassword, hashingOptions);
};

const verifyPassword = (plainPassword, hashedPassword) => {
  return argon2.verify(hashedPassword, plainPassword, hashingOptions);
};

const PRIVATE_KEY = "superSecretStringNowoneShouldKnowOrTheCanGenerateTokens";

const calculateToken = (userEmail = "", user_id = "") => {
  // eslint-disable-line
  return jwt.sign({ email: userEmail, id: user_id }, PRIVATE_KEY, {
    // eslint-disable-line
    expiresIn: "2h",
  });
};

/// //////////login/////////////
app.post("/checkCredentials", (req, res) => {
  const { email, password } = req.body;
  let existUser = null;
  db.query("SELECT * FROM users WHERE email = ?", [email]).then(
    async ([result]) => {
      existUser = result[0]; // eslint-disable-line
      if (!existUser) res.status(404).send({ message: "user does not exist" });
      else {
        const passwordIsCorect = await verifyPassword(
          password,
          existUser.hashedPassword
        );
        console.warn("passwordIsCorect", passwordIsCorect);
        if (passwordIsCorect) {
          const token = calculateToken(email, existUser.user_id);
          existUser.token = token;
          const decode = jwt_decode(token);
          res.cookie("user_token", token);
          console.warn("decode", decode);
          res.status(200).send(existUser);
        } else {
          res
            .status(401)
            .send({ message: "The password is not match with email" });
        }
      }
    }
  );
});

/// ////////////register////////////////

app.post("/register", async (req, res) => {
  const {
    email,
    username,
    consentNewsletter,
    password,
    consentForConnecting,
    role,
  } = req.body;
  const hashedPassword = await hashPassword(password);
  let validationErrors = null;
  Promise.all([
    db
      .query("SELECT * FROM users WHERE email = ?", [email])
      .then(([result]) => result[0]),
    db
      .query("SELECT * FROM users WHERE username = ?", [username])
      .then(([result]) => result[0]),
  ])
    .then(([otherUserWithEmail, user]) => {
      if (user) return Promise.reject("DUPLICATE_USERNAME"); // eslint-disable-line
      if (otherUserWithEmail) return Promise.reject("DUPLICATE_EMAIL"); // eslint-disable-line
      validationErrors = Joi.object({
        username: Joi.string().min(3).max(255).required().messages({
          "string.base": `username should be a type of 'text'`,
          "string.min": `username should have at least 3 characters`,
          "string.max": `username should have less than 255 characters`,
          "string.empty": "username can't be empty",
          "string.required": `username is a required field`,
        }),
        email: Joi.string()
          .email({ tlds: { allow: false } })
          .required()
          .messages({
            "string.base": `email is a required field`,
            "string.empty": "email can't be empty",
            "string.required": `email is a required field`,
          }),
        consentNewsletter: Joi.boolean(),
        consentForConnecting: Joi.boolean(),
      }).validate(
        {
          email,
          username,
          consentNewsletter,
          consentForConnecting,
        },
        { abortEarly: false }
      ).error;
      if (validationErrors) return Promise.reject("INVALID_DATA"); // eslint-disable-line

      return db
        .query(
          "INSERT INTO users (email, username, hashedPassword, consentNewsletter, consentForConnecting, role) VALUE (?, ?, ?, ?, ?, ?)",
          [
            email,
            username,
            hashedPassword,
            consentNewsletter,
            consentForConnecting,
            role,
          ]
        )
        .then(([{ insertId }]) => {
          const token = calculateToken(email, insertId);
          res.cookie("user_token", token);
          res.status(200).json({
            user_id: insertId,
            email,
            username,
            hashedPassword,
            consentNewsletter,
            consentForConnecting,
            role,
          });
        });
    })
    .catch((err) => {
      if (err === "DUPLICATE_USERNAME")
        res.status(409).json({ message: "This username is already used" });
      if (err === "DUPLICATE_EMAIL")
        res.status(409).send({ message: "This email is already used" });
      else if (err === "INVALID_DATA")
        res.status(422).send({ message: "Invalid data" });
      else res.status(500).send("interval server error");
    });
});
app.get("/user", (req, res) => {
  const token = req.headers.authorization;
  const decode = jwt_decode(token);
  db.query("SELECT * FROM users WHERE user_id = ?", [decode.id])
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("this user does not exist");
    });
});
/// /////////////checklist////////

app.get("/checklist", (req, res) => {
  console.warn("req.headers", req.headers.authorization);
  const token = req.headers.authorization;
  const decode = jwt_decode(token);
  console.warn("decode", decode);
  db.query("SELECT * FROM checklist WHERE user_id = ?", [decode.id])
    .then((result) => {
      const reversList = result.reverse();
      res.json(reversList);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving checklist from database");
    });
});

app.post("/checklist", (req, res) => {
  // eslint-disable-line
  const { title, responsible, checked } = req.body;
  // const checked = req.body.checked ? true : false;
  const token = req.headers.authorization;
  const decode = jwt_decode(token);
  const user_id = decode.id; // eslint-disable-line
  let validationErrors = null;
  console.warn(checked);
  validationErrors = Joi.object({
    title: Joi.string().min(3).max(255).required().messages({
      "string.base": `title should be a type of 'text'`,
      "string.min": `title should have at least 3 characters`,
      "string.max": `title should have less than 255 characters`,
      "string.empty": "title can't be empty",
      "string.required": `title is a required field`,
    }),
    responsible: Joi.string().required(),
    checked: Joi.boolean(),
  }).validate({ title, responsible, checked }, { abortEarly: false }).error;
  if (validationErrors) return Promise.reject("INVALID_DATA"); // eslint-disable-line
  db.query(
    "INSERT INTO checklist (title, responsible, checked, user_id) VALUE (?, ?, ?, ?)",
    [title, responsible, checked, user_id] // eslint-disable-line
  )
    .then(([{ insertId }]) => {
      res
        .status(201)
        .json({ id: insertId, title, responsible, checked, user_id }); // eslint-disable-line
      console.warn({ title, responsible, checked, user_id }); // eslint-disable-line
    })
    .catch((err) => {
      if (err === "INVALID_DATA") {
        res.status(422).send({ message: "Invalid data" });
      } else {
        res.status(500).send("interval server error");
      }
    });
});

app.put("/checklist", (req, res) => {
  const checklistId = req.body.id;
  const { title, responsible, checked } = req.body;
  // const checked = req.body.checked ? true : false;
  let validationErrors = null;
  let existChecklist = null;
  db.query("SELECT * FROM checklist WHERE id = ?", [checklistId]).then(
    ([results]) => {
      existChecklist = results[0]; // eslint-disable-line
      if (!existChecklist)
        return Promise.reject("THIS CHECKLIST DOSE NOT EXIST"); // eslint-disable-line
      validationErrors = Joi.object({
        title: Joi.string().min(3).max(255).required().messages({
          "string.base": `title should be a type of 'text'`,
          "string.min": `title should have at least 3 characters`,
          "string.max": `title should have less than 255 characters`,
          "string.empty": "title can't be empty",
          "string.required": `title is a required field`,
        }),
        responsible: Joi.string().required(),
        checked: Joi.boolean(),
      }).validate({ title, responsible, checked }, { abortEarly: false }).error;
      if (validationErrors) return Promise.reject("INVALID_DATA"); // eslint-disable-line
      return db
        .query("UPDATE checklist SET ? WHERE id=?", [
          { title, responsible, checked },
          checklistId,
        ])
        .then(() => {
          res.status(201).json({ ...req.body, ...existChecklist });
        })
        .catch((err) => {
          console.warn(err);
          if (err === "THIS CHECKLIST DOSE NOT EXIST")
            res.status(404).send(`Checklist with id ${checklistId} not found.`);
          else if (err === "INVALID_DATA")
            res.status(422).send({ message: "Invalid data" });
          else res.status(500).send("Error saving the provider");
        });
    }
  );
});
app.delete("/checklist/:id", (req, res) => {
  const checklistId = req.params.id;
  console.warn(checklistId);
  connection.query(
    "DELETE FROM checklist WHERE id = ?",
    [checklistId],
    (err, result) => {
      // eslint-disable-line
      if (err) {
        res.status(500).send("server interval error");
      } else {
        res.status(204).send("delete an item");
      }
    }
  );
});

/// /////////////guestslist//////////////

app.get("/guests", (req, res) => {
  const token = req.headers.authorization;
  const decode = jwt_decode(token);
  db.query("SELECT * FROM guests WHERE user_id = ?", [decode.id])
    .then((result) => {
      const reversList = result.reverse();
      res.json(reversList);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving guest from database");
    });
});

app.post("/guests", (req, res) => {
  const { firstname, lastname, number, checked } = req.body;
  const token = req.headers.authorization;
  const decode = jwt_decode(token);
  const user_id = decode.id; // eslint-disable-line
  let validationErrors = null;
  validationErrors = Joi.object({
    firstname: Joi.string()
      .min(3)
      .max(255)
      .case("lower")
      .required("firstname is required")
      .messages({
        "string.base": `firstname should be a type of 'text'`,
        "string.min": `firstname should have at least 3 characters`,
        "string.max": `firstname should have less than 255 characters`,
        "string.empty": "firstname can't be empty",
        "string.required": `firstname is a required field`,
      }),
    lastname: Joi.string()
      .min(3)
      .max(255)
      .case("lower")
      .required("firstname is required")
      .messages({
        "string.base": `lastname should be a type of 'text'`,
        "string.min": `lastname should have at least 3 characters`,
        "string.max": `lastname should have less than 255 characters`,
        "string.empty": "lastname can't be empty",
        "string.required": `lastname is a required field`,
      }),
    number: Joi.string().pattern(/^\d+$/).required().messages({
      "string.base": ` number should be a type of 'number'`,
      "string.empty": ` number cannot be an empty field`,
      "any.required": ` number is requireed`,
    }),
    checked: Joi.boolean(),
  }).validate(
    { firstname, lastname, number, checked },
    { abortEarly: false }
  ).error;

  if (validationErrors) return Promise.reject("INVALID_DATA"); // eslint-disable-line
  return db
    .query(
      "INSERT INTO guests (firstname, lastname, number, checked, user_id) VALUE (?, ?, ?, ?, ?)",
      [firstname, lastname, number, checked, user_id] // eslint-disable-line
    )
    .then(([{ insertId }]) => {
      res
        .status(201)
        .json({ id: insertId, firstname, lastname, number, checked, user_id }); // eslint-disable-line
    })
    .catch((err) => {
      if (err === "INVALID_DATA")
        res.status(422).json({ message: "Invalid data" });
      else res.status(500).json({ message: "Error saving the user" });
    });
});

app.put("/guests", (req, res) => {
  const guestId = req.body.id;
  const { firstname, lastname, number } = req.body;
  let validationErrors = null;
  let existGuest = null;
  db.query("SELECT * FROM guests WHERE id=?", [guestId]).then(([result]) => {
    existGuest = result[0]; // eslint-disable-line

    if (!existGuest) return Promise.reject("THIS GUEST DOES NOT EXIST"); // eslint-disable-line
    validationErrors = Joi.object({
      firstname: Joi.string()
        .min(3)
        .max(255)
        .case("lower")
        .required("firstname is required")
        .messages({
          "string.base": `firstname should be a type of 'text'`,
          "string.min": `firstname should have at least 3 characters`,
          "string.max": `firstname should have less than 255 characters`,
          "string.empty": "firstname can't be empty",
          "string.required": `firstname is a required field`,
        }),
      lastname: Joi.string()
        .min(3)
        .max(255)
        .case("lower")
        .required("firstname is required")
        .messages({
          "string.base": `lastname should be a type of 'text'`,
          "string.min": `lastname should have at least 3 characters`,
          "string.max": `lastname should have less than 255 characters`,
          "string.empty": "lastname can't be empty",
          "string.required": `lastname is a required field`,
        }),
      number: Joi.string().pattern(/^\d+$/).required().messages({
        "string.base": ` number should be a type of 'number'`,
        "string.empty": ` number cannot be an empty field`,
        "any.required": ` number is requireed`,
      }),
      checked: Joi.boolean(),
    }).validate(
      { firstname, lastname, number, checked }, // eslint-disable-line
      { abortEarly: false }
    ).error;
    if (validationErrors) return Promise.reject("INVALID_DATA"); // eslint-disable-line
    return db
      .query("UPDATE guests SET ? WHERE id = ?", [
        { firstname, lastname, number, checked }, // eslint-disable-line
        guestId,
      ])
      .then(() => {
        res.status(200).json({ ...existGuest, ...req.body }); // eslint-disable-line
      })
      .catch((err) => {
        if (err === "THIS PROVIDER DOES NOT EXIST")
          res.status(404).send(`Guest with id ${guestId} not found.`);
        else if (err === "INVALID_DATA")
          res.status(422).json({ message: "Invalid data" });
        else res.status(500).json({ message: "Error saving the guest" });
      });
  });
});

app.delete("/guests/:id", (req, res) => {
  const guestId = req.params.id;
  connection.query("DELETE FROM guests WHERE id = ?", [guestId], (err) => {
    if (err) {
      res.status(500).send("Error deleting an guest");
    } else {
      res.status(204).send("Guest deleted !");
    }
  });
});

app.get("/provider", (req, res) => {
  connection.query("SELECT * FROM providers", (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving users from database");
    } else {
      const reversList = result.reverse();
      res.json(reversList);
    }
  });
});

app.post("/provider", (req, res) => {
  const { title, mobile, email, price } = req.body;
  let validationErrors = null;

  db.query("SELECT * FROM providers WHERE email = ?", [email])
    .then(([result]) => {
      if (result[0]) return Promise.reject("DUPLICATE EMAIL"); // eslint-disable-line
      validationErrors = Joi.object({
        title: Joi.string()
          .min(3)
          .max(255)
          .case("lower")
          .required("title is required")
          .messages({
            "string.base": `title should be a type of 'text'`,
            "string.min": `title should have at least 3 characters`,
            "string.max": `title should have less than 255 characters`,
            "string.empty": "title can't be empty",
            "string.required": `title is a required field`,
          }),
        mobile: Joi.string().pattern(/^\d+$/).required().messages({
          "string.base": ` mobile should be a type of 'number'`,
          "string.empty": ` mobile cannot be an empty field`,
          "any.required": ` mobile is requireed`,
        }),
        email: Joi.string().email().required("email is required"),
        price: Joi.number().precision(2).required("price is required"),
      }).validate({ title, mobile, email, price }, { abortEarly: false }).error;

      if (validationErrors) return Promise.reject("INVALID_DATA"); // eslint-disable-line

      return db
        .query(
          "INSERT INTO providers (title, mobile, email, price) VALUE (?, ? ,?, ?)",
          [title, mobile, email, price]
        )
        .then(() => {
          res.status(201).json({ id: insertId, title, mobile, email, price }); // eslint-disable-line
        });
    })
    .catch((err) => {
      console.error("reject", err);
      if (err === "DUPLICATE EMAIL")
        res.status(409).json({ message: "This email is already used" });
      else if (err === "INVALID_DATA")
        res.status(422).json({ message: "Invalid data" });
      else res.status(500).json({ message: "Error saving the user" });
    });
});

app.put("/provider", (req, res) => {
  const providerId = req.body.id;
  const { title, mobile, email, price } = req.body;
  let existProvider = null;
  let validationErrors = null;
  db.query("SELECT * FROM providers WHERE id = ?", [providerId]).then(
    ([result]) => {
      existProvider = result[0]; // eslint-disable-line
      if (!existProvider) return Promise.reject("THIS PROVIDER DOES NOT EXIST"); // eslint-disable-line
      validationErrors = Joi.object({
        title: Joi.string()
          .min(3)
          .max(255)
          .case("lower")
          .required("title is required")
          .messages({
            "string.base": `title should be a type of 'text'`,
            "string.min": `title should have at least 3 characters`,
            "string.max": `title should have less than 255 characters`,
            "string.empty": "title can't be empty",
            "string.required": `title is a required field`,
          }),
        mobile: Joi.string().pattern(/^\d+$/).required().messages({
          "string.base": ` mobile should be a type of 'number'`,
          "string.empty": ` mobile cannot be an empty field`,
          "any.required": ` mobile is requireed`,
        }),
        email: Joi.string().email().required("email is required"),
        price: Joi.number().precision(2).required("price is required"),
      }).validate({ title, mobile, email, price }, { abortEarly: false }).error;
      if (validationErrors) return Promise.reject("INVALID_DATA"); // eslint-disable-line
      return db
        .query("UPDATE providers SET ? WHERE id = ?", [
          { title, mobile, email, price },
          providerId,
        ])
        .then(() => {
          res.status(200).json({ ...existProvider, ...req.body });
        })
        .catch((err) => {
          if (err === "THIS PROVIDER DOES NOT EXIST")
            res.status(404).send(`Provider with id ${providerId} not found.`);
          else if (err === "INVALID_DATA") res.status(422).send("Invalid data");
          else res.status(500).send("Error saving the provider");
        });
    }
  );
});

app.delete("/provider/:id", (req, res) => {
  const providerId = req.params.id;
  connection.query(
    "DELETE FROM providers WHERE id = ?",
    [providerId],
    (err) => {
      if (err) {
        res.status(500).send("Error deleting an provider");
      } else {
        res.status(204).send("Provider deleted !");
      }
    }
  );
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

/* app.post("/blogs", (req, res) => {
  const { title, texte } = req.body;
  connection.query(
    "INSERT INTO blogs(title, texte) VALUES (?, ?)",
    [title, texte],
    (err, result) => {
      if (err) {
        res.status(500).send("Error adding the blog");
      } else {
        res.status(200).send("Blog successfully posted");
      }
    }
  );
}); */

app.put("/blogs/:id", (req, res) => {
  const blogsId = req.params.id;
  const datbase = connection.promise();
  let existingBlog = null;
  datbase
    .query("SELECT * FROM blogs WHERE id = ?", [blogsId])
    .then(([results]) => {
      // eslint-disable-next-line prefer-destructuring
      existingBlog = results[0];
      // eslint-disable-next-line prefer-promise-reject-errors
      if (!existingBlog) return Promise.reject("RECORD_NOT_FOUND");
      return datbase.query("UPDATE movies SET ? WHERE id = ?", [
        req.body,
        blogsId,
      ]);
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

// DELETE only talker
app.delete("/contact/:id", (req, res) => {
  const talkerId = req.params.id;
  connection.query(
    "DELETE FROM talker WHERE id = ?",
    [talkerId],
    (err, result) => {
      if (err) {
        res.status(500).send("Error deleting a blog");
      } else if (result.affectedRows)
        res.status(200).send("🎉 talker deleted!");
      else res.status(404).send("talker not found");
    }
  );
});

// SEND mail and delete talker
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
          from: process.env.MAIL,
          to: emails,
          subject: "Hello",
          text: "Hello from Neue Traditionen",
          html: "<html><body><h1>Hello from Neue Traditionen</h1></body></html>",
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
