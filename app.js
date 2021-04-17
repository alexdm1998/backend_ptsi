const express = require('express');
var app = express();
app.use(express.json())
let port = process.env.PORT || 3000;


app.use(express.static(__dirname))
module.exports = app;

require('./controller/routes.js')

app.get("/", (req,res)=>{
    res.send("This is the root page of the App")
})

app.listen(port, () => {
    console.log(`App is listening on port ${port}` )
})