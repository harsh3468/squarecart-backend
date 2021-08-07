const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv').config()
app.use(cors());
const {getAllProducts} = require('./router/products');
const { generateOrder } = require('./router/orders');
const { loginUser,signupUser } = require('./router/user');
const {authMiddlewar} = require('./middlewar')
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// get all products
app.get("/products",getAllProducts)

// generate order
app.post("/order/placed",authMiddlewar,generateOrder)

// login user
app.post("/user/login",loginUser)

// signup user
app.post("/user/signup",signupUser)

app.listen(process.env.PORT,()=>{
    console.log("server up")
})