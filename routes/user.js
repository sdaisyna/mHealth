const express = require('express');
const bcrypt = require('bcryptjs'); // library file for hashing password
const jwt = require('jsonwebtoken');
const User = require('../model/user');

const router = express.Router();


router.post('/signup', (req, res, next) => {
    let password = req.body.password;
    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            throw new Error('Could not hash!');
        }
        User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            email: req.body.email,
            password: hash

        }).then((user) => {
            let token = jwt.sign({ _id: user._id }, process.env.SECRET);
            res.json({ status: "Registered successfully !", user: user._id, token: token });
        }).catch(next);
    })
})

router.post('/signin', (req, res, next) => {
    console.log(req.body);
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user == null) {
                let err = new Error('Sorry! User not found');
                err.status = 401;
            }
            else {
                bcrypt.compare(req.body.password, user.password)
                    .then((isMatch) => {
                        if (!isMatch) {
                            let err = new Error('Password doesnot match');
                            err.status = 401;
                            return next(err);
                        }
                        let token = jwt.sign({ _id: user._id }, process.env.SECRET);
                        res.json({ status: "Login sucessuflly", user: user._id, token: token });
                    }).catch(next);

            }
        }).catch(next);
})

module.exports = router;