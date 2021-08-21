var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
  res.json({text:"wellcome to digi alpha test"});
});
router.use('/v1', require('./v1/_index'));

module.exports = router;
