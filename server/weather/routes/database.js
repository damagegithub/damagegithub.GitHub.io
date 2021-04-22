var express = require('express');
var sql = require('mssql');
var router = express.Router();
(async () => {
    await sql.connect('mssql://sa:jiangusing0@localhost/weather')
})();

router.use(express.json()) // for parsing application/json
router.use(express.urlencoded({
    extended: true
})) // for parsing application/x-www-form-urlencoded

/**
 * @swagger
 * /favourites:
 *    get:
 *      description: get list of cities feom database
 *      responses:  
 *        200:
 *          description: get list success     
 *        404:  
 *          description:  data base error
 * */
router.get('/', function (req, res) {
    (async () => {
        try {
            const result = await sql.query("select DISTINCT * from cities")
            res.send(result.recordset)
        } catch (err) {
            res.status(404);
        }
    })();
});

/**
 * @swagger
 * /favourites/change:
 *    post:
 *      summary: delete or add city from/into database
 *      consumes:
 *          - application/json
 *      parameters:
 *          - name: post body
 *            in: body
 *            required: true
 *            description: city name and delete falg , del==0 add city into databale ,del==1 delete
 *            schema:
 *                type: object  
 *                required:
 *                  - cityAndDelFlag   
 *                properties:
 *                      city:
 *                          type: string   
 *                      del:
 *                          type: integer     

 *      responses:  
 *        200:
 *          description: delete or add city success    
 *        404:  
 *          description: data base error or something is wrong 
 * */

router.post('/change', function (req, res) {
    var cityName = req.body.city;
    var deleteFlag = req.body.del;
    (async () => {
        try {
            if (deleteFlag == false) {
                await sql.query(`insert into  cities (cityName) values ('${cityName}')`)
                res.send({
                    code: 200
                });
            } else {
                await sql.query(`delete from cities where cityName='${cityName}'`)
                res.send({
                    code: 200
                });
            }
        } catch (error) {
            res.status(404);
            res.send({
                code: 404
            });
        }
    })();
})


module.exports = router;