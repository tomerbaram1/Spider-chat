
const express = require('express')
const { Room } = require('../models/room')

const createRoom = (async(req,res) => {
   const {name} = req.body 


   const validateRoomExists = await Room.findOne({name})
   
   if(validateRoomExists) throw new Error("Chat room with that name already exists") 

   const chatroom = new Room({
    name,
   })
   await chatroom.save()

   res.json({
    message:"Chat room created!"
   })
})


const getRooms = (async(req,res) => {
const chatrooms = await Room.find({})

res.json(chatrooms)
})

module.exports = {
    createRoom,
    getRooms
}