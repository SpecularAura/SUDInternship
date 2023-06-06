const express = require("express");
const bodyparser = require('body-parser');
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname + '/public/')))
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

module.exports = app;