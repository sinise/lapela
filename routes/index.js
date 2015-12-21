var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('../public/index.html');
});

router.get('/ex', function(req, res, next) {
  res.sendFile('../public/bootstrap-3-3.6/docs/examples/carousel/index.html');
});

module.exports = router;
