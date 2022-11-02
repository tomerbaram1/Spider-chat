const {Message} = require('../models/messages');



 const saveMessage = async (name, message,room) => {
    
    try {
      const newMessage = await Message.create({
        name,
        message,
        room,
      });
      newMessage.save()
        return({newMessage})
    } catch (error) {
        throw error;
    }
    
  };
 

   const getAllMessages = async (room) => {
        return await Message.find({ room });

  };

  module.exports = {
    saveMessage,
    getAllMessages
}