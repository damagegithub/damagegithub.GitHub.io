var http = require('http');
var fs = require('fs');
var url = require('url');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require("./routes/index");
var weatherRouter = require("./routes/weather");
var databaseRouter = require("./routes/database")

var app = express();

app.use(express.static('public'));



app.use("/",indexRouter);
app.use("/weather",weatherRouter);
app.use("/favourites",databaseRouter);

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})

