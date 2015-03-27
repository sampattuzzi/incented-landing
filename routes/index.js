var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', { title: 'Express', challenges: [
    {
      title: "Productivity Hackers",
      id: "cambridge",
      image: "card1.png",
      members: "123",
      exists: true,
    },
    {
      title: "Early Risers",
      id: "london",
      image: "card2.png",
      members: "264",
      exists: true,
    },
    {
      title: "Your Habit",
      id: "other",
      image: "card3.png",
      members: "0",
      exists: false,
    },
    ]
  });
});

module.exports = router;
