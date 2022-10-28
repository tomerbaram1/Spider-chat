const express = require("express");
const router = express.Router();
const { createRoom, getRooms } = require("../controlees/roomController");

const {auth} = require("../middleware/auth");


// GET method
router.get("/",  getRooms);
// Post Method
router.post("/", createRoom);

module.exports = router;
