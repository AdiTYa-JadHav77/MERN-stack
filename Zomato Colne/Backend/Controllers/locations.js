const Locations = require('../Modules/location');

exports.getLocation=(req,res)=>{
  Locations.find().then(
    response=>{
      res.status(200).json({message:"Sucessfull featched Locations!",locations:response});
    }
  ).catch(
    err => {
      res.status(500).json({message:"ERRRRRor",error:err});
    }
  );
}


exports.getLocationByid=(req,res)=>{
  const locationid = req.params.LocId;

  //Eg:(http://localhost:2000/location/MSP,%20Delhi)
  
  Locations.find({"name":locationid}).then(
    response =>{
      res.status(200).json({message:"Sucessfull featched Location!",location:response});
    }
  ).catch(
    err => {
      res.status(500).json({message:"ERRRRRRRRRRRor",error:err});
    }
  );
}