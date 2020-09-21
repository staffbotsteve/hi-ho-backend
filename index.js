const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const mongoose = require('mongoose');
const cors = require("cors");

// Load env variables
dotenv.config({ path: "./config.env" });

// Connect to DB
const connectDB = async () => {
  try {
      const conn = await mongoose.connect(process.env.MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false
      });

      console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold)
  } catch (err) {
      console.log(`MongoDB Connection Error: ${err.message}`.red)
  }
}
connectDB()

const app = express();

// Body Parser middleware
app.use(express.json());

//allow cross origin
app.use(cors());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("hi-ho-frontend/build"));
}

// Mount routers
app.use("/api/v1/auth", require("./routes/auth"));

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
