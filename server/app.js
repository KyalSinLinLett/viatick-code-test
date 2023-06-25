const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const app = express();
app.use(helmet());
app.use(cors({ origin: { allow: "*" } }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const uploadFile = require("./src/router/upload.router");
const mp4FilesRouter = require("./src/router/mp4Files.router");
const gpsRouter = require("./src/router/gps.router");

app.get("/alive", (req, res) => res.send({ message: "server's up" }));
app.use("/upload", uploadFile);
app.use("/mp4Files/list", mp4FilesRouter);
app.use("/gps", gpsRouter);

module.exports = app;
