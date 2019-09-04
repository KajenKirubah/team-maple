const path = require("path");
const dotEnvPath = path.resolve("../.env");
require("dotenv").config({ path: dotEnvPath });
import createError from "http-errors";
import express, { json, urlencoded } from "express";
import { join } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import passport from "passport";
import mongoose from "mongoose";

import indexRouter from "./routes/index";
import pingRouter from "./routes/ping";
import authRoutes from "./routes/auth";
import uploadRouter from "./routes/upload";

var app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

app.use(passport.initialize());
require("./services/passport")(passport);

app.use('/auth', authRoutes);
app.use("/", indexRouter);
app.use("/ping", pingRouter);
app.use("/upload", uploadRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
