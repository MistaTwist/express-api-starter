const express = require("express");
const router = express.Router();

// base command template:
// router.get('/', (req,res,next) => {});

// READ ALL
router.get("/", (req, res, next) => {
  res.json({
    message: "Hello, READ ALL!",
  });
});

// READ ONE
router.get("/:id", (req, res, next) => {
  res.json({
    message: "Hello, READ ONE!",
  });
});

// CREATE ONE
router.post("/", (req, res, next) => {
  res.json({
    message: "Hello, CREATE ONE!",
  });
});

// UPDATE ONE
router.put("/:id", (req, res, next) => {
  res.json({
    message: "Hello, UPDATE ONE!",
  });
});

// DELETE ONE
router.delete("/:id", (req, res, next) => {
  res.json({
    message: "Hello, DELETE ONE!",
  });
});

module.exports = router;
