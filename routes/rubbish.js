var express = require('express');
var path = require('path');
var fs = require('fs');
var router = express.Router();
var multer = require('multer');
const rubbishPath = path.join(__dirname, '../public/rubbish');
const tmpPath = global.isLocal ? 'd:/tmp/rubbish' : '/tmp/rubbish';
const del = require('del');
const utils = require('../utils');

const aa = new Buffer('41f1cdafd0cfc5479f').toString('base64');
const bb = new Buffer('8181a59ba6c059a').toString('base64');


const myBase64 = `${new Buffer(
  'NDFmMWNkYWZkMGNmYzU0Nzlm',
  'base64'
).toString()}6266bb3${new Buffer('ODE4MWE1OWJhNmMwNTlh', 'base64').toString()}`;

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tmpPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

genWorkerFolder();

var upload = multer({ storage: storage }).any();

router.post('/', function (req, res) {
  del.sync([tmpPath + '/*'], { force: true });
  upload(req, res, async function (err) {
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

router.get('/clear', function (req, res) {
  del.sync([tmpPath + '/*'], { force: true });
  del.sync([rubbishPath + '/*'], { force: true });
  genWorkerFolder();
  pushRepo();
  res.json({ message: 'ok' });
});

async function pushRepo() {
  const {
    body,
  } = await got(
    'https://api.github.com/repos/cjz9032/speeder/releases/latest',
    { responseType: 'json' }
  );
  const nextVer = utils.getVerStr(utils.getVerNum(body.tag_name) + 1);

  const { exec } = require('child_process');
  const run = `sh -x "${path.posix.join(global.rootPath, 'routes/push.sh')}" "${
    global.rootPath
  }" "${tmpPath}" ${nextVer} ${myBase64}`;
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

function genWorkerFolder() {
  fs.mkdir(rubbishPath, { recursive: true }, (err) => {
    if (err) throw err;
  });

  fs.mkdir(tmpPath, { recursive: true }, (err) => {
    if (err) throw err;
  });
}

module.exports = router;
