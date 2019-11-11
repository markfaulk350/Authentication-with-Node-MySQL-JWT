const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

// Create Database Connection
// =============================================================================
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// Connect
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Connected to mySQL !!!")
});
// =============================================================================

// Need to configure app to use bodyParser()
// This lets us get data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.port || 8080;

const router = express.Router();

// Test route to make sure everything is working as planned at (http://localhost:8080/api)
router.get('/', (req, res) => {
    res.json({ message: "API is alive & healthy !!!" })
});

// All routes will be place here
// =============================================================================

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

// Verify Token Middleware Function
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403)
    }
}

// REGISTER OUR ROUTES
// All routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port, () => console.log(`Server now listening for requests on port ${port}`));
