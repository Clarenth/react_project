var express = require("express");
const bodyParser = require('body-parser');
var mongoose = require("mongoose");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers',
      'Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  next();
});

mongoose.connect('mongodb://user:DukeRedrix44@ds143156.mlab.com:43156/comp3133assignment',{ useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo database!');
  })
  .catch(err  => {
    console.error('App starting error:', err.stack);
  });

const eventRoutes = require("./routes/events");
const messageRoutes = require("./routes/messages");
const roomHistoryRoutes = require("./routes/roomHistory");
const adminRoutes = require("./routes/admins");
const roomRoutes = require("./routes/rooms");

console.log('Attempting to connect to mongoose');

app.use("/api/events", eventRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/roomhistory", roomHistoryRoutes);

module.exports = app;