const express = require("express");
const app = express();
const path = require("path")

// define the first route
app.get("/Beehoney", function (req, res) {
    res.sendFile(path.join(__dirname, 'Beehoney/index.html'));
})

app.get("/pong", function (req, res) {
    res.sendFile(path.join(__dirname, 'pong/index.html'));
})

app.get("/flappy-bird", function (req, res) {
    res.sendFile(path.join(__dirname, 'FlappyBird/src/view/index.html'));
})

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, 'main.html'));
})

// use the express-static middleware
app.use(express.static("./"));



// start the server listening for requests
app.listen(process.env.PORT || 3000,
    () => console.log("Server is running..."));