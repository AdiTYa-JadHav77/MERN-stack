const mongoose = require("mongoose");
const schema = mongoose.Schema;

const mealtypeSchema = new schema({
    id:{
        type:Number,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    mealtype:{
        type:String,
        require:true
    }
})
module.exports = mongoose.model('mealtype',mealtypeSchema,'mealtype');