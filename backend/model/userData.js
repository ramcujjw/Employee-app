const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName : String,
    password : String,
    phoneNo : Number
    
    

});

const userData = mongoose.model('user',userSchema);
module.exports = userData;