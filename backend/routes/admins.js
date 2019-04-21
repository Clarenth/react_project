const express = require("express");
const AdminModel = require('../models/admin');
const mongoose = require('mongoose');
const router = express.Router();

router.get('', (req, res, next) => {
  console.log('ADMINS GET');
  AdminModel.find(function(err,admins){
  if(err){
    res.send(err);
  }
  else{
    res.setHeader('Content-Type',"application/json"); 
    res.end(JSON.stringify(admins, null, 3));
  }})
});

router.post('', (req, res, next) => {
  console.log('ADMINS POST');
  let admin = req.body;
  if(!admin.username || !admin.password){
    res.status(400);
    console.log('ERROR ADDING ADMIN');
  }
  else{
    AdminModel.create(admin).then(admin => {
      res.status(200).json(admin);
    });
  }
});

module.exports = router;