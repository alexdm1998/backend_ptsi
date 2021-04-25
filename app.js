const express = require('express');
const cors = require('cors')
var app = express();
app.use(express.json())
let port = process.env.PORT || 3000;
let host = process.env.HOST || '127.0.0.1';

app.use(express.static(__dirname));
app.use(cors());
module.exports = app;

require('./controller/routes.js')

app.listen(port, () => {
    console.log(`App is listening in ${host} on port ${port}` )
})