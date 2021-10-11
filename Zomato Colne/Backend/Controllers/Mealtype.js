
const mealtype = require("../Modules/Mealtype");

exports.getMealtype=(req,res)=>{
    mealtype.find().then(
        response=>{
            res.status(200).json({message:"Sucessfull fetched Mealtype!",mealtypes:response});
        }
    ).catch(
        err =>{
            res.status(500).json({message:"Error",error:err});
        }
    );
}
