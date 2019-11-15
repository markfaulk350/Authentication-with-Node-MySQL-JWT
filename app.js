require('dotenv').config();

const express = require('express');
const router = express.Router();
// const sls = require('serverless-http'); // ( Uncomment for deployment )
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.port || 8080;

// REGISTER OUR ROUTES
router.use('/auth', require('./routes/auth'));
router.use('/users', require('./routes/users'));
router.use('/health', require('./routes/health'));

// Route Prefix
app.use('/api/v1', router);

// START THE SERVER
app.listen(port, () => console.log(`Server now listening for requests on http://localhost:${port}/api/v1/`));

// Deploy to AWS Lambda
// module.exports.server = sls(app) // ( Uncomment for deployment )