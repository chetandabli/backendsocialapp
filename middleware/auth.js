const jwt = require('jsonwebtoken');

const auth = (req, res, next)=>{
    let token = req.headers.authorization
    let userID = jwt.verify(token, process.env.secretKey);
    req.body.userID = userID.token
    next()
}
module.exports = {auth}