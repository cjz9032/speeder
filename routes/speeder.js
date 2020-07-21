var express = require('express');
var router = express.Router();
var path = require('path');

// var createHandler = require('github-webhook-handler');
// rewrite path '/'
// var handler = createHandler({ path: '/', secret: '1' });

router.get('/force', function (req, res, next) {
  buildRepo();
  res.json({ status: 0, msg: 'ok' });
});

router.post('/', function (req, res, next) {
  if (req.body && req.body.head_commit && req.body.head_commit.message !== 'chore: upload') {
    buildRepo();
    res.json({ status: 0, msg: 'ok' });
  } else {
    res.json({ status: 1, msg: 'others' });
  }

  // handler(req, res, function (err) {
  //   // console.log('aaaaaaaaa1', err);
  //   // res.statusCode = 404;
  //   // res.end('no such location');
  // });
});

// handler.on('error', function (err) {
//   buildRepo();
//   console.error('Error:', err.message);
// });

// handler.on('push', function (event) {
//   buildRepo();
//   console.log(
//     'Received a push event for %s to %s',
//     event.payload.repository.name,
//     event.payload.ref
//   );
// });

function buildRepo() {
  const { exec } = require('child_process');
  const run = `sh -x "${path.posix.join(global.rootPath, 'routes/deploy.sh')}" "${
    global.rootPath
  }" ${global.isLocal ? 1 : 0 }`;
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
