const jwt = require('jsonwebtoken')
exports.authMiddlewar = (req, res, next) => {
    try {
        if (jwt.verify(req.headers.authorization, "happy@cart").data === "cartsquare") {
            next()
        }else{
            throw Error()
        }
    } catch (error) {
        res.status(400).json({ error: "unauthorized access" })
    }
}

