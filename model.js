const mongoose = require('mongoose');

const Details =new mongoose.Schema({
    name:{
        type : String,
        required : true,
    },
    email :{
        type : String,
        required : true,

    },
    password:{
        type : String,
        required : true,
    },
    registerDate :{
        type : Date,
        default : Date.now
    }

})

module.exports = mongoose.model("Details",Details);

