const express = require('express');
const jwt = require('jsonwebtoken');
const cookie = require('cookie')
const bcrypt = require('bcrypt');
const { AdminModel } = require('../models/Admin.model');
require('dotenv').config()

const adminRouter = express.Router();

adminRouter.post('/register', async (req, res) => {
    const { name, email, password, mobile, adminkey } = req.body;
    if (!adminkey || adminkey != process.env.ADMIN_LOGIN_KEY) {
        return res.status(401).send({ message: 'Access Denied' })
    }

    let check = await AdminModel.findOne({ email });

    if (check) {
        return res.status(409).send({ message: 'Admin already registerd' })
    }

    bcrypt.hash(password, +process.env.saltRounds, async function (err, hashedPass) {
        if (err) {
            console.log(err);
            return res.status(404).send({ message: err.message })
        }
        try {
            const user = new AdminModel({
                name, email, password: hashedPass, mobile
            })
            await user.save()
            res.send({ message: 'Admin Registered Sucessfully' })
        } catch (error) {
            console.log(error)
            return res.status(404).send({ message: error.message })
        }
    });

})

adminRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await AdminModel.findOne({ email });

    if (!user) {
        return res.status(401).send({ message: 'Access Denied' })
    }

    bcrypt.compare(password, user.password, async function (err, result) {
        if (err) {
            return res.status(404).send({ message: err.message })
        }
        if (result) {
            var token = jwt.sign({ id: user._id, role: 'admin' }, process.env.LOGIN_TOKEN_SECRET);
            res.setHeader('Set-Cookie', cookie.serialize('token', token, {
                httpOnly: true,
                maxAge: 60 * 60 * 24
            }));
            res.send({ message: 'Login Sucessful', token })
        } else {
            res.status(403).send({ message: 'Wrong Credentials' })
        }
    });

})


module.exports = {
    adminRouter
}