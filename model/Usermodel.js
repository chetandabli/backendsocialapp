const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    "name": String,
    "email": String,
    "gender": String,
    "password": String
});

const Usermodel = mongoose.model("registreduser", userSchema);

module.exports = {
    Usermodel
}