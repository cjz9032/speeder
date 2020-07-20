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

router.post('/', upload.any(), function (req, res, next) {
  let files = req.files;
  // push
  pushRepo()
  res.json({ message: 'ok' });
});

function pushRepo() {
  const { exec } = require('child_process');
  const run = `sh "${path.posix.join(global.rootPath, 'routes/push.sh')}" "${
    global.rootPath
  }"`;
  console.log(run);
  exec(run, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    }
  });
}

module.exports = router;
