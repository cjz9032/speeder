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
    // const tp = path.join(rubbishPath, file.originalname);
    // let fileExists = fs.existsSync(tp);
    // if (fileExists) {
    //   fs.unlinkSync(tp);
    // }
    cb(null, '/tmp/rubbish');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage }).any();

router.post('/', function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
    } else if (err) {
      // An unknown error occurred when uploading.
    }
    let files = req.files;
    console.log('uploader me');
    // push
    // pushRepo();
    res.json({ message: 'ok' });
    // Everything went fine.
  });
});
// setTimeout(() => {
//   pullRepo();
// }, 1000);

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

function pullRepo() {
  const { exec } = require('child_process');
  const run = `sh "${path.posix.join(global.rootPath, 'routes/pull.sh')}" "${
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
