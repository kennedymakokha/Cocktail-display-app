var express = require('express')
var path = require('path');
var dotenv = require('dotenv');
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const cock = require('./routes/cocktails');

dotenv.config();

const PORT = process.env.PORT;
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('tiny'));

// mongoose connection 
mongoose.Promise = global.Promise;

require("dotenv").config();
var db;
mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (err, database) {
    if (err) {
        return console.log(err)
    };
    db = database

    console.log('db connected')
});
app.use('/api/cocktails', cock);
app.use(express.static('public'));
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});