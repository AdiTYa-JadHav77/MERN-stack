const mongoose = require("mongoose");
const schema = mongoose.Schema;

const menuSchema = new schema({
    name:{
        type:String,
        require:true
    },
    restaurantId:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    ingridients:{
        type:Array,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    qty:{
        type:Number,
        require:true
    }
})
module.exports = mongoose.model('items',menuSchema,'items');