const { response } = require('express');
const orders = require('../Modules/order')

exports.myOrder=(req,res)=>{
    const { email, firstName,lastName,menuItems,address,subTotal,phone_number,rest_name } = req.body;
    orders.find({ email: email })
    const userorder = new orders({
        email: email,
        firstName: firstName,
        lastName: lastName,
        address: address,
        phone_number:phone_number,
        menuItems: menuItems,
        subTotal: subTotal,
        rest_name:rest_name
    });
    if (!email || !firstName || !lastName || !address || !phone_number) {
        res.status(200).json({ message: "please enter all details" })
     }
   else
   { userorder.save().then(response => {
            res.status(200).json({ message: "orders feactched Succesfully", orders: response })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })}
}


    exports.previousOrders=(req,res)=>{
        const {email}= req.params;
        orders.find({email:email}).then(
          response=>{
            res.status(200).json({message:"Sucessfull featched orders",orders:response});
          }
        ).catch(
          err => {
            res.status(500).json({message:"ERRRRRor",error:err});
          }
        );
      }

