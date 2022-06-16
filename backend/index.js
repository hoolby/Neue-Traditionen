//require("dotenv").config();
const connection = require("./db-config");
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const Joi = require("joi");
const { promise } = require("./db-config");
const app = express();
app.use(express.json());
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
/* connection.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
  } else {
    console.log("connected as id " + connection.threadId);
  }
}); */

app.post("/provider", (req, res) => {
  const { title, mobile, email, price } = req.body;
  //let validationErrors = null;
  db.query("SELECT * FROM providers WHERE email = ?", [email])
    .then(([result]) => {
      if (result[0])
        return res.status(409).json({
          type: "DUPLICATE EMAIL",
          message: "the email is already exist in the data base",
        });
      //res.status(409).json({ message: "This email is already used" });
      /*    validationErrors = Joi.object({
        title: Joi.string()
          .min(3)
          .max(255)
          .required("title is required")
          .messages({
            "string.base": `title should be a type of 'text'`,
            "string.min": `title should have at least 3 characters`,
            "string.max": `title should have less than 255 characters`,
            "string.empty": "title can't be empty",
            "string.required": `title is a required field`,
          }),
        mobile: Joi.string()
          .pattern(/^\d+$/)
          .required("mobile phone should be number"),
        email: Joi.string().email().required("email is required"),
        price: Joi.number().integer().required("price is required"),
      }).validate({ title, mobile, email, price }, { abortEarly: false }).error; */

      /*    if (validationErrors)
        return Promise.reject({
          type: "INVALID_DATA",
          message: validationErrors,
        }); */
      return db
        .query(
          "INSERT INTO providers (title, mobile, email, price) VALUE (?, ? ,?, ?)",
          [title, mobile, email, price]
        )
        .then(([{ insertId }]) => {
          res.status(200).json({ id: insertId, title, mobile, email, price });
        });
    })
    .catch((err) => {
      console.error("reject", err);
      if (err.type === "DUPLICATE EMAIL")
        res.status(409).json({ message: err.message });
      /* else if (err.type === "INVALID_DATA")
        res.status(409).json({ message: err.message }); */ else
        res.status(500).send("Error saving the user");
    });
});

app.get("/provider", (req, res) => {
  connection.query("SELECT * FROM providers", (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving users from database");
    } else {
      res.json(result);
    }
  });
});

app.put("/provider", (req, res) => {
  const providerId = req.body.id;
  const { title, mobile, email, price } = req.body;

  let existProvider = null;
  // let validationErrors = null;
  db.query("SELECT * FROM providers WHERE id = ?", [providerId]).then(
    ([result]) => {
      console.log("req.body is ", { ...req.body });

      existProvider = result[0];
      console.log("existProvider is ", { ...existProvider });
      if (!existProvider) return Promise.reject("THIS PROVIDER DOES NOT EXIST");
      /*  validationErrors = Joi.object({
        title: Joi.string().min(3).max(255),
        mobile: Joi.number(),
        email: Joi.string().email(),
        price: Joi.number(),
      }).validate({ title, mobile, email, price }, { abortEarly: false }).error;

      if (validationErrors) return Promise.reject("INVALID_DATA"); */
      return db
        .query("UPDATE providers SET ? WHERE id = ?", [
          { title, mobile, email, price },
          providerId,
        ])
        .then(() => {
          //console.log(result);
          console.log({ ...existProvider, ...req.body });
          res.status(200).json({ ...existProvider, ...req.body });
        })
        .catch((err) => {
          console.log(err);
          if (err === "THIS PROVIDER DOES NOT EXIST")
            res.status(404).send(`User with id ${userId} not found.`);
          /*  else if (err === "INVALID_DATA") res.status(422).send("INVALID_DATA"); */ else
            res.status(500).send("Error saving the provider");
        });
    }
  );
});

app.delete("/provider/:id", (req, res) => {
  const providerId = req.params.id;
  console.log(providerId);
  connection.query(
    "DELETE FROM providers WHERE id = ?",
    [providerId],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error deleting an user");
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

app.listen(port, (err) => {
  console.log(`Server listening on port ${port}`);
  connection.connect((err) => {
    if (err) {
      console.error(`error connecting: ${err.stack}`);
    }
  });
});
