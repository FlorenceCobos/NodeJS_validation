var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'IT-Exam NodeJS & API-CRUD' });
});

module.exports = router;
