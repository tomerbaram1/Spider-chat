const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({

    
        name: { type: String, required: true },
        message: { type: String, required: true },
        room: { type: String, required: true },
      },
      { timestamps: true }
    );

const Message = mongoose.model('message', MessageSchema);

module.exports = {Message}