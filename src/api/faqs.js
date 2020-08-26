const express = require("express");
const monk = require("monk");
const Joi = require("joi");

const db = monk(process.env.MONGO_URI);
const faqs = db.get("faqs");

const schema = Joi.object({
  question: Joi.string().trim().required(),
  answer: Joi.string().trim().required(),
  video_url: Joi.string().uri(),
});

const router = express.Router();

// base command template:
/* 
router.get('/', async (req,res,next) => {

});
*/
// READ ALL
router.get("/", async (req, res, next) => {
  try {
    const items = await faqs.find({});
    res.json(items);
  } catch (error) {
    next(error);
  }
});

// READ ONE
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await faqs.findOne({
      _id: id,
    });
    if (!item) return next();
    res.json(item);
  } catch (error) {
    next(error);
  }
});

// CREATE ONE
router.post("/", async (req, res, next) => {
  try {
    const value = await schema.validate(req.body);
    const inserted = await faqs.insert(value);
    res.json(inserted);
  } catch (error) {
    next(error);
  }
});

// UPDATE ONE
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const value = await schema.validate(req.body);
    const item = await faqs.findOne({
      _id: id,
    });
    if (!item) return next();
    await faqs.update(
      {
        _id: id,
      },
      {
        $set: {
          value,
        },
      }
    );
    res.json(value);
  } catch (error) {
    next(error);
  }
});

// DELETE ONE
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await faqs.remove({ _id: id });
    res.json({
      message: "Success.",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
