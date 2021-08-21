var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
  res.json({text:"api v1"});
});
router.use('/books',require('./books'))

module.exports = router;
