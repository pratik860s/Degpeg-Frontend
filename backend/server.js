// const express = require("express");
// const dotenv = require("dotenv");
// const { chats } = require("./data/data");
// const connectDB = require("./config/db");
// const colors = require("colors");
// const userRoutes = require("./routes/userRoutes");
// const chatRoutes = require("./routes/chatRoutes");
// const messageRoutes = require("./routes/messageRoutes");
// const path= require('path');

// const { notFound, errorHandler } = require("./middleware/errorMiddleware");
// dotenv.config({ path: '../.env'});

// connectDB();

// const app = express();
// app.use(express.json());

// app.use("/api/user", userRoutes);
// app.use("/api/chat", chatRoutes);
// app.use("/api/message", messageRoutes);

// //--------------Deployment--------------

// const __dirname1= path.resolve();
// if(process.env.NODE_ENV==='production'){
//   app.use(express.static(path.join(__dirname1,"/frontend/build")));

//   app.get('*',(req,res)=>{
//     res.sendFile(path.resolve(__dirname1,"frontend","build","index.html"));
//   });
// }else{
//   app.get("/",(req,res)=>{
//     res.send("API is running successfully");
//   });
// }

// //--------------Deployment--------------


// app.use(notFound);
// app.use(errorHandler);
// app.use((req, res, next) => {
//   res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
//   next();
// });

// const PORT = process.env.PORT || 5000;

// const server = app.listen(
//   PORT,
//   console.log(`Server is Started on PORT : ${PORT}`.yellow.bold)
// );

// const io = require("socket.io")(server, {
//   pingTimeout: 60000,
//   cors: {
//     origin: "http://localhost:3000",
//   },
// });

// io.on("connection", (socket) => {
//   console.log("Connected to socket.io");
//   socket.on("setup", (userData) => {
//     socket.join(userData._id);
//     socket.emit("connected");
//   });

//   socket.on("join chat", (room) => {
//     socket.join(room);
//     console.log("User Joined Room " + room);
//   });

//   socket.on("typing", (room) => socket.in(room).emit("typing"));
//   socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

//   socket.on("new message", (newMessageRecieved) => {
//     var chat = newMessageRecieved.chat;

//     if (!chat.users) return console.log("Chat users not defined");

//     chat.users.forEach((user) => {
//       if (user._id == newMessageRecieved.sender._id) return;
//       socket.in(user._id).emit("message recieved", newMessageRecieved);
//     });
//   });
//   socket.off("setup", () => {
//     console.log("USER DISCONNECTED");
//     socket.leave(userData._id);
//   });
// });
// server.js (or app.js)

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const app = express();
const PORT = process.env.PORT || 8000;

// Set up multer for file handling
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    // You can use file.originalname to keep the original file name
    cb(null, file.fieldname + '-' + Date.now())
  }
});

const upload = multer({ storage: storage });

// Middleware
app.use(cors());

// Handle form submission with multer for multiple files
app.post('/submit-form', upload.fields([
  { name: 'cancelledCheque', maxCount: 1 },
  { name: 'addressProof', maxCount: 1 }
]), (req, res) => {
  try {
    console.log('Received form data:', req.body);
    console.log('Received files:', req.files); 

    const formData = req.body;
    const fileData = req.files; 
    res.status(200).json({ message: 'Form submitted successfully', formData, fileData });
  } catch (error) {
    console.error('Error handling form submission:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
