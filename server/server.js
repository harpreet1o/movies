const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const users = require("./routes/users");

//connecting data base
mongoose.connect(
  `mongodb+srv://harpreetsingh:ronaldo07@cluster0.nafae0e.mongodb.net/`,
  { useNewUrlParser: true }
);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to database"));

//To prevent cors error
app.use(cors());
// To convert the data to json
app.use(express.json());
//To give routes
app.use("/", users);

app.listen(3120, () => console.log("server started"));
