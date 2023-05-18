require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Details = require("./model");
const cors = require('cors')

const app = express();
const port = process.env.PORT || 8081;
app.use(express.json());
app.use(cors())

mongoose
  .connect("mongodb+srv://ravi:ravi@cluster0.iq75fde.mongodb.net/")
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err.message));

const routes = require("./routes/");
app.use("/", routes.user);



app.listen(port, () => console.log("App is Listining at port " + port));
