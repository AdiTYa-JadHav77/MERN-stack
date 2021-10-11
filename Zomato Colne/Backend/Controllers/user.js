const  express  =require('express');
const User = require('../Modules/user');


exports.login = (req, res) => {
    const { email, password } = req.body;
    User.find({ email: email, password: password })
        .then(response => {
            if (response.length > 0) {
                res.status(200).json({ message: "user Login Succesfully", isauthenticateduser: true, User: response })
            } 
                res.status(200).json({ message: "Please enter correct email and password", isauthenticateduser: false, User: response })
            
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}

exports.signUp = (req, res) => {
    const { email, password, firstName, lastName, phone_number, address } = req.body;
    User.find({ email: email })
        .then(response => {
            if (response.length >= 1) {
                res.status(200).json({ message: "user already exist"})

            } else {
                const usersignedin = new User({ email: email, password: password, firstName: firstName, lastName: lastName, phone_number: phone_number, address: address });
                usersignedin.save().then(response => {
                        res.status(200).json({ message: "user registerd Succesfully", User: response })
                    })
                    .catch(err => {
                        res.status(500).json({ error: err })
                    })
            }
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })


}