// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function(req, res) {
    res.json({ greeting: "hello API" });
});

app.get("/api/timestamp/:date_string?", function(req, res) {
    try {
        const date_string = req.params.date_string;
        let date = date_string ? new Date(date_string) : new Date();

        const isNotDate = () =>
            !(date instanceof Date) || isNaN(date.getTime());

        if (isNotDate()) date = new Date(parseInt(date_string));
        if (isNotDate()) throw Error("Invalid Date");

        res.json({ unix: date.getTime(), utc: date.toUTCString() });
    } catch (err) {
        res.json({ utc: err.message });
    }
});

// listen for requests :)
var listener = app.listen(4000, function() {
    console.log("Your app is listening on port " + listener.address().port);
});
