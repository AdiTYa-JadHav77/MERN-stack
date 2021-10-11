const mongoose = require("mongoose");
const schema = mongoose.Schema;

const locationSchema = new schema({
    id:{
        type:Number,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    city_id:{
        type:Number,
        require:true
    },
    location_id:{
        type:Number,
        require:true
    },
    country_namae:{
        type:String,
        require:true
    }

})
module.exports = mongoose.model('locations',locationSchema,'locations');