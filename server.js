const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
const MONGODB_URI = process.env.MONGODB_URI || process.env.LOCAL;

//Connect to the Mongo DB
//mongoose.connect( process.env.REMOTE, {
 mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

const PORT = 8080;

const app = express();

//app.use(logger("dev"));

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(express.static("public"));

// mongoose.connect("mongodb://localhost/workout", {
//     useNewUrlParser: true,
//     useFindAndModify: false
// });

// routes
app.use(require("./routes/api.js"));
app.use(require("./routes/view.js"));

app.listen(PORT, () => {
    console.log("App is running on http://localhost:" + PORT);
});