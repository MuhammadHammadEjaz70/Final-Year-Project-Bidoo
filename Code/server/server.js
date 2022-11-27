const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const { readdirSync } = require("fs");
require("dotenv").config();

//import Routes
// const authRoutes = require("./routes/auth.routes");
// const userRoutes = require("./routes/users.routes");
// const categoryRoutes=require("./routes/category.routes");

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

// routes  middlewares
// app.use("/api", authRoutes);
// app.use("/api", userRoutes);
// app.use("/api",categoryRoutes)

readdirSync("./routes").map((route) =>
  app.use("/api", require("./routes/" + route))
);

//routes

//port
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Running Server on port ${port}`);
});
