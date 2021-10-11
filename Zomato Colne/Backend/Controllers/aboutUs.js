
const aboutUs = require("../Modules/aboutUs");

exports.about=(req,res)=>{
    aboutUs.find().then(
        response=>{
            res.status(200).json({message:"Sucessfull fetched about!",aboutUs:response});
        }
    ).catch(
        err =>{
            res.status(500).json({message:"Error",error:err});
        }
    );
}
