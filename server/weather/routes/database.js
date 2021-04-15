var express = require('express');
var sql = require('mssql');
var router = express.Router();
(async ()=>{
    await sql.connect('mssql://sa:jiangusing0@localhost/weather')
})();

router.use(express.json()) // for parsing application/json
router.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


router.get('/', function (req, res) {
    (async () => {
        const result = await sql.query("select DISTINCT * from cities")
        res.send(result.recordset)
    })();
});

router.post('/change', function (req, res) {
    var cityName = req.body.city;
    var deleteFlag = req.body.del;
    (async () => {
        try {
            if (deleteFlag == 0) {
                await sql.query(`insert into  cities (cityName) values ('${cityName}')`)
                res.send({code: 200});
            } else {
                await sql.query(`delete from cities where cityName='${cityName}'`)
                res.send({code: 200});
            }
        } catch (error) {
            res.status(404);
            res.send({code: 404});
        }
    })();
})


module.exports = router;