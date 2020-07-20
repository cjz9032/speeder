var express = require('express');
var path = require('path');
var fs = require('fs');
var router = express.Router();
var multer = require('multer');
const rubbishPath = path.join(__dirname, '../public/rubbish');

fs.mkdir(rubbishPath, { recursive: true }, (err) => {
  if (err) throw err;
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, rubbishPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });

/* GET users listing. */

router.post('/', upload.any(), function (req, res, next) {
  let files = req.files;
  res.json({ message: 'ok' });
});

module.exports = router;
