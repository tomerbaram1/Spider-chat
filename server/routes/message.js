const express = require("express");
const router = express.Router();
const {getAllMessages,saveMessage } = require("../services/messages");

router.get('/:room',async (req,res,next) => {
    try {
        const { room } = req.params;
        const data = await getAllMessages(room); 
        res.send(data);
        
    } catch (error) {
        next(error);
    }
} )

module.exports = router;