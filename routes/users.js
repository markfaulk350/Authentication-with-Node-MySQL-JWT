const express = require('express');
const router = express.Router();
const db = require('../db');
const verifyToken = require('../middleware/verifyToken');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/signup', async (req, res, next) => {
    // Need to see if there is already a user with that email.
    let findStatement = `SELECT * FROM users WHERE email=?;`;
    db.query(findStatement, req.body.email, (err, result) => {
        if (result.length === 0) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err,
                        custom_message: "failed to hash new user password"
                    });
                } else {
                    const u = {
                        fName: req.body.fName,
                        lName: req.body.lName,
                        email: req.body.email,
                        password: hash
                    }
                    let sqlStatement = `INSERT INTO users(fName, lName, email, password) VALUES (?, ?, ?, ?);`;
                    db.query(sqlStatement, [u.fName, u.lName, u.email, u.password], (err, result) => {
                        if (err) {
                            res.status(500).json({
                                error: err,
                                custom_message: "failed inserting new user into db"
                            });
                        } else {
                            res.status(201).json({
                                userID: result.insertId,
                                custom_message: "new user was successfully created"
                            });
                        }
                    });
                }
            });
        } else {
            res.status(409).json({
                error: `Cannot create user. Email: ${req.body.email} is already taken`
            })
        }
    });
});

router.get('/:id', async (req, res, next) => {
    let userID = req.params.id
    res.status(200).json({
        user: userID
    })
})

module.exports = router;