const mongoose = require("mongoose");
const express = require("express");
const app = express();
const jobRouter = require("../routes/jobRouter");
const {
  unknownEndpoint,
  errorHandler,
} = require("../middleware/customMiddleware");

// Middleware to parse JSON
app.use(express.json());

// Use the tourRouter for all "/tours" routes
app.use("/api/jobs", jobRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

mongoose
  .connect( "mongodb+srv://atz7689:AwhQvqw3Ca4k9Z4y@lucas.a14jx.mongodb.net/TEST-web-dev-24-no-auth")
  .then(() => {
    console.log("connected to db");
  })
  .catch((error) => {
    console.error(error);
  });

module.exports = app;
