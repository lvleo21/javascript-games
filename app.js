const express = require("express");
const app = express();
const path = require("path")

// define the first route
app.get("/beehoney", function (req, res) {
    res.sendFile(path.join(__dirname, 'beehoney/index.html'));
})

app.get("/pong", function (req, res) {
    res.sendFile(path.join(__dirname, 'pong/index.html'));
})

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, 'main.html'));
})

// use the express-static middleware
app.use(express.static("beehoney"));
app.use(express.static("pong"));

// start the server listening for requests
app.listen(process.env.PORT || 3000,
    () => console.log("Server is running..."));