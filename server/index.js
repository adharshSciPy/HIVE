const express = require("express");
const app = express();
const User = require('./models/userSchema')
const socket = require('socket.io')
const PORT = 5000;
const connect = require("./mongodb/config.js");
const userRouter = require("./routers/UserRouter.js");
const publicRouter = require("./routers/PublicRouter.js");
const adminRouter = require("./routers/adminRouter.js")
const studentRouter = require('./routers/studentRouter.js')
const chatRoute = require('./routers/chatRoute.js')
const cors = require("cors");
const bodyParser = require("body-parser");

// mongoose connection
connect();

// middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.get("/", (req, res) => {
  console.log("backend ready");
});

app.use("/user", userRouter);
app.use("/public", publicRouter);
app.use('/admin', adminRouter);
app.use('/student', studentRouter);
app.use('/chat', chatRoute)

// Start the server
const server = app.listen(5000, () => {
  console.log('Server listening on port 5000');
});

// chat socket.io logic
const io = socket(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true
  }
})

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("addUser", (id) => {
    onlineUsers.set(id, socket.id);
  })

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);

    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", data.message)
    }
  })
})

