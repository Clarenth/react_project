const express = require("express");
const EventModel = require('../models/event');
const mongoose = require('mongoose');
const router = express.Router();

router.get('', (req, res, next) => {
  console.log('EVENTS GET');
  EventModel.find(function(err,events){
    if(err){
      res.send(err);
    }
    else{
      res.setHeader('Content-Type',"application/json"); 
      res.end(JSON.stringify(events, null, 3));
    }
  })
});

router.post('', (req, res, next) => {
  
  console.log('post events');
  
  var event = req.body;
  if(!event.username || !event.action || !event.room){
    res.status(400);
    console.log('Bad Data for New Event  INSERT:');
  }
  else{
    EventModel.create(event);
  }
});

module.exports = router;