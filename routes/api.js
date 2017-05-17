var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.json({message: "I'm a json response"});
});



module.exports = router;
