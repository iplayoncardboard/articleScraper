const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const indexRoutes = require('./routes/index');
const articleRoutes = require('./routes/articles');
// const routes = require('./routes/');
const exphbs = require("express-handlebars");
const path = require("path");



// const db = require("./models");

const PORT = 3000;

const app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));

// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Connect to the Mongo DB

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/articleScraper";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);


// Set Handlebars.
app.engine("handlebars", exphbs({ defaultLayout: "main", partialsDir: [
    //  path to your partials
    __dirname + '/views/partials',
] }));
app.set("view engine", "handlebars");



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(indexRoutes);
app.use(articleRoutes)

app.listen(PORT, () => {
console.log("Server listening on: http://localhost:" + PORT)}); 