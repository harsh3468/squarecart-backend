const sql = require('mysql')
console.log(process.env.DB_HOST)
var dbconnect = sql.createConnection({
    host      : process.env.DB_HOST,
    user      : process.env.DB_USER,
    port      : process.env.DB_PORT,
    password  : process.env.DB_PASSWORD,
    database  : process.env.DATABASE
  });
dbconnect.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected!");
});
module.exports = {dbconnect}