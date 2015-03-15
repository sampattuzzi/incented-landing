var express = require('express');
var router = express.Router();
var mcapi = require('../node_modules/mailchimp-api/mailchimp');

var MC_API_KEY = process.env.MC_API_KEY;
if (!MC_API_KEY) {
  console.error("No MailChimp API key provided.");
}

var MC_LIST_ID = process.env.MC_LIST_ID;
if (!MC_LIST_ID) {
  console.error("No MailChimp list id provided.");
}

var mc = new mcapi.Mailchimp(MC_API_KEY);


router.post('/signup', function(req, res) {
  name = req.body.name
  email = req.body.email
  if (!name || !email) {
    res.status(500).send({error:"Malformed post"});
    return;
  }

  mc.lists.subscribe({
    id: MC_LIST_ID, 
    email:{
      email:email
    },
    merge_vars: {
      "NAME": name,
      "optin_ip": req.ip,
      "optin_time": new Date(),
    },
    "double_optin": false,
    "update_existing": true,
    "send_welcome": true
    
  }, function(data) {
    res.cookie("email", email);
    res.send({status:"success"});
  }, function(error) {
    if (error.error) {
      res.status(500).send({error:"Mailchimp error, " + error.code + ": " + error.error});
    } else {
      res.status(500).send({error:"Mailchimp error generic error."});
    }
  });
  
});

router.post('/add_details', function(req, res) {
  habits = req.body.habits
  if (!habits) {
    habits = "NONE";
  } else {
    habits = habits.toString()
  }
  extra_habits = req.body.extra_habits
  if (!extra_habits) {
    extra_habits = "NONE";
  }
  email = req.cookies.email
  if (!email) {
    res.status(500).send({error:"Doesn't seem like you logged in already."});
    return;
  }

  mc.lists.subscribe({
    id: MC_LIST_ID, 
    email:{
      email:email
    },
    merge_vars: {
      "HABITS": habits,
      "MOREHABITS" : extra_habits
    },
    "update_existing": true,
    
  }, function(data) {
    res.send({status:"success"});
  }, function(error) {
    if (error.error) {
      res.status(500).send({error:"Mailchimp error, " + error.code + ": " + error.error});
    } else {
      res.status(500).send({error:"Mailchimp error generic error."});
    }
  });
  
});

module.exports = router;
