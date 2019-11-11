const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const router = express.Router();
const db = require('../db');
const verifyToken = require('../verifyToken');
const jwt = require('jsonwebtoken');

// Health
router.get('/', (req, res) => {
    res.json({ message: "API is alive & healthy !!!" })
});

// Register
router.post('/register', (req, res) => {
    res.json({endpoint: 'register'});
})

// Login
router.post('/login', (req, res) => {
    const user = {
        id: 1,
        userName: "markfaulkner",
        email: "markfaulk350@gmail.com"
    }

    jwt.sign({ user }, process.env.JWT_SECRET, (err, token) => {
        if (err) {
            res.sendStatus(500)
        } else {
            res.json({ token })
        }
    });
});

// Protected
router.post('/protected', verifyToken, (req, res) => {
    jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            res.json({
                sensitiveInfo: {
                    socialSecurityNumber: "123456789",
                    bankPassword: "password"
                },
                theBearerToken: authData
            });
        }
    });
});

module.exports = router;