const express = require("express");
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const User = require('./models/userSchema')

const PORT = 5000;
const connect = require("./mongodb/config.js");
const userRouter = require("./routers/UserRouter.js");
const publicRouter = require("./routers/PublicRouter.js");
const adminRouter = require("./routers/adminRouter.js")
const studentRouter = require('./routers/studentRouter.js')
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

// chat socket.io logic
// Socket.io chat
io.on('connection', (socket) => {
  console.log('User connected');

  // Authenticate user using JWT token
  const { token } = socket.handshake.query;

  try {
    const { id } = jwt.verify(token, 'secret');
    socket.userId = id;
  } catch (err) {
    socket.disconnect(true);
  }

  // Handle chat events
  socket.on('message', async ({ to, text }) => {
    try {
      // Get sender's name
      const sender = await User.findById(socket.userId).select('name');

      // Get receiver's socket ID
      const receiver = await User.findById(to).select('socketId');

      // Send message to receiver
      io.to(receiver.socketId).emit('message', { from: sender.name, text });
    } catch (err) {
      console.log('Error sending' + err)
    }
  });


  // Handle disconnections
  socket.on('disconnect', () => {
    console.log('a user disconnected');
  });
});

// Start the server
http.listen(5000, () => {
  console.log('Server listening on port 3000');
});
