const express = require("express");
const router = express.Router();
const { Course, User } = require("../models");
const { authenticateUser } = require("../middleware/auth-users");

router.get("/", (req, res) => {
  Course.findAll({
    include: [
      {
        model: User,
      },
    ],
  })
    .then((data) => {
      res.status(200);
      res.json(data);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

router.get("/:id", (req, res) => {
  Course.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: User,
      },
    ],
  })
    .then((course) => {
      res.status(200).json(course).end();
    })
    .catch((error) => {
      res.status(400);
      res.json(error).end();
    });
});

router.post("/", authenticateUser, (req, res) => {
  Course.create(req.body)
    .then((course) => {
      res.status(201).json(course).end();
    })
    .catch((error) => {
      res.status(400);
      res.json(error).end();
    });
});

router.put("/:id", authenticateUser, function (req, res, next) {
  Course.findByPk(req.params.id)
    .then(function (course) {
      course
        .update(req.body)
        .then((courseData) => {
          res.status(204);
          res.json({}).end();
        })
        .catch((courseError) => {
          res.status(400);
          res.json(courseError).end();
        });
    })
    .catch((error) => {
      res.status(400);
      res.json(error).end();
    });
});

//delete course
router.delete("/:id", authenticateUser, function (req, res, next) {
  Course.findByPk(req.params.id)
    .then((course) => {
      course.destroy();
      res.status(204).end();
    })
    .catch((error) => {
      res.status(400);
      res.json(error).end();
    });
});

module.exports = router;
