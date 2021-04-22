var http = require('http');
var fs = require('fs');
var url = require('url');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var swaggerUI = require("swagger-ui-express");
var swaggerJSDoc = require("swagger-jsdoc");

var indexRouter = require("./routes/index");
var weatherRouter = require("./routes/weather");
var databaseRouter = require("./routes/database")

var app = express();

const swaggerOptions = {
  swaggerDefinition: {
    // 采用的 openapi 版本。***注意该版本直接影响了管网参考版本。
    //openapi: "3.0.0",
    // 页面基本信息
    info: {
      title: "WEB-WEATHER", //设置swagger的标题。（项目名称）
      version: "1.0.0", //设置版本
    },
  },
  // 去指定项目路径下收集 swagger 注释，用于生成swagger文档。
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
console.log(swaggerDocs);
app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerDocs));


app.use(express.static('public'));
app.use("/", indexRouter);
app.use("/weather", weatherRouter);
app.use("/favourites", databaseRouter);


var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("app listening at http://%s:%s", host, port)
})