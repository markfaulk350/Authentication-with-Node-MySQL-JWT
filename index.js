const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.port || 8080;

// REGISTER OUR ROUTES
app.use('/api', require('./routes/api'));

// START THE SERVER
app.listen(port, () => console.log(`Server now listening for requests on port ${port}`));