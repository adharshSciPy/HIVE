const express = require("express");
const app = express();
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

app.listen(PORT, () => {
  console.log("Server Running");
});
