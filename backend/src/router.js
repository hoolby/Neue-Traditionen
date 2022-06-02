const express = require("express");

// test for blogs route
const fs = require("fs");

const { ItemController } = require("./controllers");

const router = express.Router();

router.get("/items", ItemController.browse);
router.get("/items/:id", ItemController.read);
router.put("/items/:id", ItemController.edit);
router.post("/items", ItemController.add);
router.delete("/items/:id", ItemController.delete);

// blogs route test
router.post("/blogs", ItemController.add);
router.get("/blogs", function (req, res) {
  const rawdata = fs.readFileSync("./database.json");
  const finalData = JSON.parse(rawdata);
  res.send(finalData);
});
router.get("/blogs/:id", function (req, res) {
  const rawdata = fs.readFileSync("./database.json");
  const finalData = JSON.parse(rawdata);
  const blog = finalData.blogs.filter((x) => x.id === Number(req.params.id));
  res.send(blog);
});

module.exports = router;
