const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();

require("./Database/db");
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

const authRoutes = require("./routes/auth");
const { db } = require("./model/User");

app.use("/api", authRoutes);
app.use((req, res, next) => {
  console.log("Here");
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});