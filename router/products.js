const {dbconnect} = require('../config')
exports.getAllProducts=(req,res)=>{
    dbconnect.query("SELECT * FROM products",(error,result,fields)=>{
        if(error){
            return res.status(400).json(error.sqlMessage);;
        }
        return res.status(200).json(result);
    })
}