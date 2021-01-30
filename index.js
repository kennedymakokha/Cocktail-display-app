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
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, function (err, database) {
  if (err) {
    return console.log(err)
  };
  db = database

  console.log('db connected')
});
app.use(express.static('images'));
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/api/cocktails', cock);
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});
// app.use(express.static('public'));
// app.use(express.static('public'));
// app.use('/', express.static(path.join(__dirname, 'uploads')));

// // Default Route
// app.get('*', function (req, res) {
//     res.sendFile(path.join(__dirname, './client/build', 'index.html'));
//   });
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});