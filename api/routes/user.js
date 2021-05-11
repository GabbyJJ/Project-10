const express = require("express");
const router = express.Router();
const { Users, Courses } = require("../models");
const { authenticateUser } = require("../middleware/auth-users");

router.get("/", authenticateUser, (req, res, next) => {
  Users.findOne({
    where: { id: req.currentUser.id },
  })
    .then((user) => {
      res.status(200);
      res.json(user).end();
    })
    .catch((error) => {
      res.status(400);
      res.json(error).end();
    });
});

router.post("/", (req, res) => {
  const user = req.body;

  Users.create(req.body)
    .then((user) => {
      res.status(201).location("/").end();
      res.end();
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(error);
      res.end();
    });
});
module.exports = router;
