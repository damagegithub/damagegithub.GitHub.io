var express = require('express');
var sql = require('mssql');
var router = express.Router();
(async ()=>{
    await sql.connect('mssql://sa:jiangusing0@localhost/weather')
})();


router.get('/', function (req, res) {
    (async () => {
        const result = await sql.query("select * from cities")
        console.dir(result.recordset)
        res.send(result.recordset)
    })();
});

router.get('/change', function (req, res) {
    var cityName = req.query.city;
    var deleteFlag = req.query.del;
    (async () => {
         
        try {
            if (deleteFlag == 0) {
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
            res.send({
                code: 404
            });
            console.log(error)
        }

    })();
})


module.exports = router;