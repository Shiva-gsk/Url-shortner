// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const shortid = require('shortid');
const rateLimit = require('express-rate-limit');
const MONGODB_URL =  process.env.MONGODB_URL;

const limiter1 = rateLimit({
    windowMs: 24*60 * 60 * 1000, 
    max: 20 
});
const limiter2 = rateLimit({
    windowMs: 24*60 * 60 * 1000, 
    max: 20 
});
const limiter3 = rateLimit({
    windowMs: 24*60 * 60 * 1000, 
    max: 20 
});
const limiter4 = rateLimit({
    windowMs: 24*60 * 60 * 1000, 
    max: 20 
});

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(limiter);

const shortUrlRouter = require('./routes/shortUrlRouter');
const redirectRouter = require('./routes/redirectRouter');
const detailsRouter = require("./routes/detailsRouter");
const topRouter = require("./routes/topRouter");

const Url = require('./models/urlSchema');

// MongoDB connection
const mongoURL = MONGODB_URL || 'mongodb+srv://admin:admin@cluster0.pgqn1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoURL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Define URL schema

// POST /shorten
app.use('/shorten', limiter1, shortUrlRouter);

// GET /redirect/:shortUrl
app.use('/redirect', limiter2, redirectRouter);


// GET /details/:url
app.use('/details', limiter3, detailsRouter);


// GET /top/:number
app.use('/top', limiter4, topRouter);

// Rate Limiting middleware
app.use((req, res, next) => {
    // Implement rate-limiting logic here using a library like express-rate-limit or custom logic.
    next();
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
