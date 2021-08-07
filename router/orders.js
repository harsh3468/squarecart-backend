const { dbconnect } = require('../config')

exports.generateOrder = async (req, res) => {
    await dbconnect.query('SET FOREIGN_KEY_CHECKS=0');
    dbconnect.query('INSERT INTO order_detail (user_id,total_amount,user_address,order_date) VALUES (?,?,?,?)', [req.body.user_id, req.body.total_amount,req.body.user_address,new Date()], async (error, result, fields) => {
        await dbconnect.query('SET FOREIGN_KEY_CHECKS=1');
        if (error) {
            return res.status(400).json(error.sqlMessage);
        }
        orderedProduct(req.body.orderMap, result.insertId, () => {
            return res.status(201).json(result.insertId)
        })
    })
}

const orderedProduct = async (orderMap, orderId, callback) => {
    await dbconnect.query('SET FOREIGN_KEY_CHECKS=0');
    orderMap.forEach(data => {
        dbconnect.query('INSERT INTO order_items (order_id,product_id,quantity) VALUES (?,?,?)', [orderId, data.id, data.quantity])
    });
    await dbconnect.query('SET FOREIGN_KEY_CHECKS=1');
    callback()
}