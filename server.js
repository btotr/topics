var express = require('express');
var app = express();
var oneDay = 86400000;
app.use(express.static(__dirname, { maxAge: oneDay }));

app.listen(process.env.PORT || 8081);
console.log("running port: ", process.env.PORT)