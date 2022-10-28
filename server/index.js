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
const rateLimit= require('express-rate-limit')

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
      origin: `http://localhost:3000`,
      methods: ["GET", "POST"],
    },
  });

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

// let users = []
// const addUser = (userId,socketId) =>{
//   !users.some(user=> user.userId ===userId) &&
//   users.push(userId,socketId)
// }

// const removeUser = (socketId) => {
//   users = users.filter(user=>user.socketId !== socketId)
// }
// socket


const jwt = require('jsonwebtoken')


io.use((socket, next) => {
  try {
    const token = socket.handshake.query.token;

    const payload =  jwt.verify(token, process.env.JWT_SECRET_KEY);
    socket.userId = payload._id;

    next();
  } catch (err) {}
});
io.on('connection',(socket) =>{

  console.log("Connected: " + socket.userId);

  socket.on('join_room',(room) => {
    socket.join(room)
    console.log(room);
  })
  socket.on('send_message',(message,room,user)=>{
    
  })
    

    socket.on("disconnect", () => {
      console.log(` Disconnected:` + socket.userId);

      
    })


    })


// routes
app.use('/api/register',register)
app.use('/api/login',login)
app.use('/api/room',room)


// listener


server.listen(port, () => console.log(`server in running on ${port}`));