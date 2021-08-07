const sql = require('mysql')
var dbconnect = sql.createConnection({
    host      : process.env.DB_HOST,
    user      : process.env.DB_USER,
    port      : process.env.DB_PORT,
    password  : process.env.DB_PASSWORD,
    database  : process.env.DATABASE
  });
dbconnect.connect(function(err) {
    if (err) throw err;
});
module.exports = {dbconnect}