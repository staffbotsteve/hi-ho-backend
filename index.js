const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('./config/db')

// Load env variables
dotenv.config({ path: './config/config.env' });

// Connect to DB
connectDB();

const app = express();

// Body Parser middleware
app.use(express.json());

// Mount routers
app.use('/api/v1/auth', require('./routes/auth'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))