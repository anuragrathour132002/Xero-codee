const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/keys')
const requireLogin = require('../middleware/Passport')



router.post('/signup', (req, res) => {
    var { firstname, lastname, email, password } = req.body
    if (!email || !firstname) {
      return res.status(422).json({ error: "Please add all the fields" })
    }
    if (firstname.length < 6) {
      return res.status(422).json({ error: `Your firstname must be having 6 or more characters. You have entered only ${firstname.length} characters.` })
    }
    if (firstname.length > 30) {
      return res.status(422).json({ error: `Your firstname must not be having more than 30 characters. You have entered ${firstname.length} characters.` })
    }
    if (lastname.length > 30) {
      return res.status(422).json({ error: `Your name must not be having more than 30 characters. You have entered ${name.length} characters.` })
    }
    User.findOne({ firstname: firstname })
      .then((savedUser) => {
        if (savedUser) {
          return res.status(422).json({ error: "firstname already taken" })
        }
        User.findOne({ lastname: lastname  })
          .then((savedUser) => {
            if (savedUser) {
              return res.status(422).json({ error: "lastName already taken" })
            }
            User.findOne({ email: email })
              .then((savedUser) => {
                if (savedUser) {
                  return res.status(422).json({ error: "User already exists with this email" })
                }
                bcrypt.hash(password, 12)
                  .then(hashedpassword => {
                    const user = new User({
                      firstname,
                      email,
                      password: hashedpassword,
                      lastname,
                    
                    })
                    user.save()
                      .then(user => {
                        res.json({ message: "Signed Up successfully" })
                      })
                      
                  })
              })
          })
      })
      .catch(err => {
        console.log(err)
      })
  })


router.post('/signin', (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(422).json({ error: "Please add email or password" })
    }
    User.findOne({ email: email })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({ error: "Invalid Email or password" })
            }
            bcrypt.compare(password, savedUser.password)
                .then(doMatch => {
                    if (doMatch) {
                        //res.json({message:"successfully signed in"})
                        const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET)
                        
                        const { _id, firstname, lastname, email, password } = savedUser
                      
                        
                        res.json({ token, user: { _id, firstname, lastname, email, password } })
                        
                    }
                    else {
                        return res.status(422).json({ error: "Invalid Email or password" })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        })
})

module.exports = router