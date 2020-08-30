var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('快乐回家辣椒粉垃圾');
});

module.exports = router;
