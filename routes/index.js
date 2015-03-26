var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', { title: 'Express', challenges: [
    {
      title: "Cambridge",
      id: "cambridge",
      image: "card1.png",
      members: "123",
      exists: true,
    },
    {
      title: "London",
      id: "london",
      image: "card2.png",
      members: "64",
      exists: true,
    },
    {
      title: "Your city",
      id: "other",
      image: "card3.png",
      members: "0",
      exists: false,
    },
    ]
  });
});

module.exports = router;
