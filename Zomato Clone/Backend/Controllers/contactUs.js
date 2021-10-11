const contact = require('../Modules/contactUs')

exports.contactUS=(req,res)=>{
    const { email, firstName,lastName,message,address,phone_number } = req.body;
    const userorder = new contact({
        email: email,
        firstName: firstName,
        lastName: lastName,
        address: address,
        phone_number:phone_number,
        message: message
    });
    if(!email || !firstName || !lastName || !message || !address || !phone_number){
        res.status(200).json({ message: "Please enter all details "});
    }
    else{
        userorder.save().then(response => {
            res.status(200).json({ message: "Thank you! Data stored Successfully" })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
    }
}
