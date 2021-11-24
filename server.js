const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const user_route = require("./routes/user_routes");
const exam_route = require("./routes/exam_route");
const question_route = require("./routes/question_route");
const responses_route = require("./routes/responses_route");
const dotenv = require("dotenv");

const cors = require("cors");

////middle ware set up
dotenv.config();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

///. API's connections
app.use("/user", user_route);
app.use("/exam", exam_route);
app.use("/question", question_route);
app.use("/responses", responses_route);

////react part

// app.use(express.static(path.join(__dirname, "frontend", "build")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
// });

///socket

io.on("connection", (socket) => {
  socket.on("join-room", (examId, userName) => {
    socket.join(examId);
    socket.on("message", (userName, message) => {
      io.in(examId).emit("createMessage", userName, message);
    });
  });
});

///// DB and server setup
mongoose.Promise = global.Promise;

mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(err);
    } else console.log("connected to db");
  }
);

server.listen(process.env.PORT, () => {
  console.log("Server is listening on port: " + process.env.PORT);
});
