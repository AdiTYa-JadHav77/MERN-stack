const mongoose = require("mongoose");
const schema = mongoose.Schema;

const contactSchema = new schema({
    email:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    firstName:{
        type:String,
        require:true
    },
    lastName:{
        type:String,
        require:true
    },
    message:{
        type:String,
        require:true
    },
    phone_number:{
        type:Number,
        require:true
    }

})
module.exports = mongoose.model('contactUs',contactSchema,'contactUs');
