var express = require('express');
var path = require('path');
var fs = require('fs');
var router = express.Router();
var multer = require('multer');
const rubbishPath = path.join(__dirname, '../public/rubbish');
const tmpPath = global.isLocal ? 'd:/tmp/rubbish' : '/tmp/rubbish';
const del = require('del');
fs.mkdir(rubbishPath, { recursive: true }, (err) => {
  if (err) throw err;
});

fs.mkdir(tmpPath, { recursive: true }, (err) => {
  if (err) throw err;
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tmpPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage }).any();

router.post('/', function (req, res) {
  del.sync([tmpPath + '/*'], { force: true });
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
    } else if (err) {
      // An unknown error occurred when uploading.
    }
    let files = req.files;
    console.log('uploader me');
    // push

    pushRepo();
    res.json({ message: 'ok' });
  });
});

router.post('/clearRubbish', function (req, res) {
  del.sync([rubbishPath + '/*'], { force: true });
  pushRepo();
  res.json({ message: 'ok' });
});

function pushRepo() {
  const { exec } = require('child_process');
  const run = `sh -x "${path.posix.join(global.rootPath, 'routes/push.sh')}" "${
    global.rootPath
  }" "${tmpPath}"`;
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

function pullRepo() {
  const { exec } = require('child_process');
  const run = `sh -x "${path.posix.join(global.rootPath, 'routes/pull.sh')}" "${
    global.rootPath
  }"`;
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
