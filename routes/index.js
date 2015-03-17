var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', { title: 'Express', challenges: [
    {
      title: "Wake up",
      id: "wake-up-challenge",
      image: "card1.png",
      members: "1,056",
      success: "91%",
      days: "7"
    },
    {
      title: "Get out more",
      id: "get-out-challenge",
      image: "card2.png",
      members: "726",
      success: "84%",
      days: "7"
    },
    {
      title: "Run to fit",
      id: "running-challenge",
      image: "card3.png",
      members: "502",
      success: "81%",
      days: "7"
    },
    ]
  });
});

module.exports = router;
