const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv").config();

// app
const app = express();

//dabatabse

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connection to MongoDB created");
  })
  .catch((err) => {
    console.log("Erro connecting");
    console.log(err);
  });

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

//routes
app.get("/api", (req, res) => {
  res.json({
    name: "hammad",
  });
});

//port
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Running Server on port ${port}`);
});
