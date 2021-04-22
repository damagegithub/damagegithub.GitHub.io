var express = require('express');
var router = express.Router();

/**
 * @swagger
 * /:
 *    get:
 *      description: get home page index.html and needed css,js
 *      responses:  
 *        200:
 *          description: return index.html   
 * */
router.get('/', function (req, res) {
  res.sendFile("../public/index.html");
});
module.exports = router;