const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const app = express();
const port = 4000;
const mainRoute = require(`./src/routes/index`);
app.use(
  cors({
    origin: "*",
    method: "*",
  })
);
app.use(helmet());
app.use(xss());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", mainRoute);
app.use("/", (req, res) => {
  res.status(200).json({
    status: "Connected to API ANKASA successfully",
    statusCode: 200,
  });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});