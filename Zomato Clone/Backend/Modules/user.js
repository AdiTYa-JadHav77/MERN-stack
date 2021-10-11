const Mongoose  = require('mongoose');
const schema = Mongoose.Schema;

const loginSchema = new schema({

    email:{
        type:String,
        require:true
    },
    password:{
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
    }

})
module.exports=Mongoose.model('user',loginSchema,'user')