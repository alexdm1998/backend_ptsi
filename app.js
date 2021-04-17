const express = require('express');
var app = express();
app.use(express.json())

app.listen(3000);
app.use(express.static(__dirname))
module.exports = app;

require('./controller/routes.js')