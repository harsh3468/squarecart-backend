const {dbconnect} = require('../config')

exports.generateOrder = async(req,res)=>{
    await dbconnect.query('SET FOREIGN_KEY_CHECKS=0');
    dbconnect.query('INSERT INTO order_detail (user_id,total_amount,user_address) VALUES (?,?,?)',[req.body.user_id,req.body.total_amount,req.body.user_address],async (error,result,fields)=>{
        await dbconnect.query('SET FOREIGN_KEY_CHECKS=1');
        if(error){
            return res.status(400).json(error.sqlMessage);;
        }
        return res.status(201).json(result.insertId);
    })
}

exports.orderedProduct = async(req,res)=>{
    await dbconnect.query('SET FOREIGN_KEY_CHECKS=0');
    dbconnect.query('INSERT INTO order_detail (order_id,order,user_address) VALUES (?,?,?)',[req.body.user_id,req.body.total_amount,req.body.user_address],async (error,result,fields)=>{
        await dbconnect.query('SET FOREIGN_KEY_CHECKS=1');
        if(error){
            return res.status(400).json(error.sqlMessage);;
        }
        return res.status(201).json(result.insertId);
    })
}