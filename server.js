"use strict";

var http = require("http"),
    express = require("express");

const app = express();

app.use((request, response, next) => {
    console.log("In middleware 1");
    response.write("HEADER");
    next();
    console.log("Out of middleware 1");
});

app.get("/", (request, response) => {
    response.end("Hello, World! Yay!");
    console.log("In handler");
});

const server = new http.Server(app);

const port = 3000;
server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
