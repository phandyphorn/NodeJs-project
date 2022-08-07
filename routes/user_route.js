const express = require('express');
let router = express.Router();
const models_user = require('../models/user_models.js');
const mongoose = require('mongoose');
// user route
// get all the users 

router.get('/', (req, res) => {
    models_user.users_models.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err)
            console.error(err)
        })
})

router.post("/login", (req, res) => {
    let user_data = req.body;
    models_user.users_models.find(user_data)
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            res.send(err)
            console.log(err)
        })
})

router.post("/create_user", (req, res) => {
    let user_register = req.body;
    models_user.users_models.create(user_register)
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            res.send(err)
            console.log(err)
        })
})

router.delete('/delete/:id', (req, res) => {
    console.log({ _id: req.params.id })
    models_user.users_models.deleteMany({ _id: req.params.id })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err)
            console.error(err)
        })
})
module.exports = router;
