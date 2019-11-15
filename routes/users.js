const express = require('express');
const router = express.Router();
// const db = require('../db');
// const verifyToken = require('../middleware/verifyToken');
// const jwt = require('jsonwebtoken');

router.get('/', async (req, res, next) => {
    res.status(200).json({
        users: [
            { name: "Mark", glider: "Ozone" },
            { name: "Chris", glider: "Ozone" }]
    })
})

router.get('/:id', async (req, res, next) => {
    let userID = req.params.id
    res.status(200).json({
        user: userID
    })
})

module.exports = router;