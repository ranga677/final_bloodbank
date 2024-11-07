const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });
const colors = require('colors');
const morgan = require("morgan");
const cors = require("cors");
const path = require('path');

// MongoDB connection
const connectDB = require("./config/db");
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/test', require('./routes/testRoutes'));
app.use('/auth', require('./routes/authRoutes'));
app.use('/inventory', require('./routes/inventoryRoutes'));
app.use('/analytics', require('./routes/analyticsRoutes'));
app.use('/admin', require('./routes/adminRoutes'));

// Serve static files from the client/build folder for deployed applications
app.use(express.static(path.join(__dirname, './client/build')));

// Catch-all route to serve the React app for any route not handled by the backend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});

// Port
const PORT = process.env.PORT || 8080;

// Listen
app.listen(PORT, () => {
    console.log(Blood Bank Server is Running in ${process.env.DEV_MODE} Mode on PORT ${PORT}..bgYellow.black);
});