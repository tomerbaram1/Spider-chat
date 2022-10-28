const express = require("express");
const router = express.Router();

const {
  getUsers,
  createUser,
  deleteUser,
} = require("../controlees/authController");

// Get all Method
router.get("/", getUsers);

// Post Method
router.post("/", createUser);

// Delete One Method
router.delete("/:id", deleteUser);

module.exports = router;
