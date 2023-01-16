

function encryption(req, res, next){
    bcrypt.hash(req.body.password, 5, function(err, hash) {
        if(err){
            connsole.log(err);
            res.json({message: "user not registred"})
        }else{
            req.body.password = hash;
            next()
        }
    });
}

module.exports = {
    encryption
}