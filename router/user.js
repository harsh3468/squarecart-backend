const bcrypt = require('bcrypt')
const jwt  = require('jsonwebtoken')
const {dbconnect} = require('../config')

exports.loginUser = (req,res)=>{
    dbconnect.query('SELECT id,password FROM users WHERE email=(?)',[req.body.email],(error,result,fields)=>{
    if(error){
        console.log(error)
        return res.status(400).json(error.sqlMessage);
    }
    if(result.length){
        if(!bcrypt.compareSync(req.body.password,result[0].password)){
            return res.status(400).json({error:"wrong password"});
        }else{
            return res.status(200).json({user_id:result[0].id,token:jwt.sign({data:'cartsquare'},'happy@cart')});
        }
       
    }else{
        return res.status(400).json({error:"wrong email address"});
    }
})
}
exports.signupUser = (req,res)=>{
    console.log(req.body)
    dbconnect.query('INSERT INTO users (email,first_name,last_name,phone_number,password) VALUES (?,?,?,?,?)',[req.body.email,req.body.firstName,req.body.lastName,req.body.phoneNumber,bcrypt.hashSync(req.body.password,8)
        ],(error,result,fields)=>{
        if(error){
            console.log(error)
            return res.status(400).json(error.sqlMessage);
        }
        return res.status(201).json(result);
    })
}