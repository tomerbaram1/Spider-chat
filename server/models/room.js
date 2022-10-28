const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({

    name:{   type: String,
        required: "Name is required!",},
})

const Room = mongoose.model('room', RoomSchema);

module.exports = {Room}