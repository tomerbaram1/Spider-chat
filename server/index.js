// import modules
require('dotenv').config({ path: '.env' });
const mongoose = require('mongoose');
const http = require("http");
const { Server } = require("socket.io");
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const port =  process.env.PORT || 3001;
const register = require('./routes/register')
const login = require('./routes/login')
const room = require('./routes/room')
const message = require('./routes/message')
const rateLimit= require('express-rate-limit')
const {saveMessage} = require("./services/messages")
const User = mongoose.model("user");
// DB
mongoose.connect(process.env.DB,{
    useNewUrlParser:true,
    useUnifiedTopology: true,

}).then(()=>console.log("Connected To Database!"))
.catch((err)=>console.log('Could not connect to database',err.message));

// middleware

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: '*',
    },
  });
app.use(cors())
app.use(express.json())
app.use(morgan("dev"));


// Limit requests from API
const limiter = rateLimit({
    max:1000,
    windowMs: 60 * 60 * 1000,
    message:"too many requests from this API"
})
app.use(limiter)

// body
app.get("/",(req,res) =>{
    res.send('Welcome to Whatsapp API')
})

// io.use((socket, next) => {
//   try {
//     const token = socket.handshake.query.token;

//     const payload =  jwt.verify(token, process.env.JWT_SECRET_KEY);
//     socket.userId = payload._id;

//     next();
//   } catch (err) {}
// });
io.on('connection',(socket) =>{

  socket.on('join',(room) => {
    socket.join(room)

  })


  socket.on('message', async ({ message, room, name }) => {

    const newMessage = await saveMessage(message, name, room);

    io.in(room).emit('replayMessage', newMessage.newMessage);
  });
    

  socket.on('leaveRoom',(room) => {
    socket.leave(room)
    console.log("A user has left group:", room);
  })



    socket.on("disconnect", () => {
      io.emit('message','a user has left the chat')

      
    })


    })


// routes
app.use('/api/register',register)
app.use('/api/login',login)
app.use('/api/room',room)
app.use('/api/message',message)


// listener


server.listen(port, () => console.log(`server in running on ${port}`));