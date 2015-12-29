var express = require('express');
var router = express.Router();
var path = require('path');
var publicDir = path.join(__dirname, '../public');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('../public/index.html');
});

router.get('/[^\.]+$', function(req, res){
    res.sendFile(path.join(publicDir, 'index.html'));
});

router.get('/ex', function(req, res, next) {
  res.sendFile('../public/bootstrap-3-3.6/docs/examples/carousel/index.html');
});

module.exports = router;

