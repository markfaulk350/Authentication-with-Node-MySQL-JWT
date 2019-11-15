require('dotenv').config(); // ( Comment for deployment )

const express = require('express');
const router = express.Router();
// const sls = require('serverless-http'); // ( Uncomment for deployment )
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// Route Prefix
app.use('/api/v1', router);

// REGISTER OUR ROUTES
router.use('/auth', require('./routes/auth'));
router.use('/users', require('./routes/users'));
router.use('/health', require('./routes/health'));

// Error handler - when none of the endpoints match
router.use((req, res, next) => {
    res.status(404).json({
        error: {
            message: "404 not found",
            from: "Mark's API"
        }
    })
})

const port = process.env.port || 8080; // ( Comment for deployment )

// START THE SERVER
app.listen(port, () => console.log(`Server now listening for requests on http://localhost:${port}/api/v1/`)); // ( Comment for deployment )

// Deploy to AWS Lambda
// module.exports.server = sls(app) // ( Uncomment for deployment )