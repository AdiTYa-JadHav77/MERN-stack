const Mongoose  = require('mongoose');
const schema = Mongoose.Schema;

const aboutSchema = new schema({

    title:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    point:{
        type:Array,
        require:true
    },
    description:{
        type:Array,
        require:true
    }

})
module.exports=Mongoose.model('about',aboutSchema,'about')