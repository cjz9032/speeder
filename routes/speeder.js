var express = require('express');
var router = express.Router();
var path = require('path');

var createHandler = require('github-webhook-handler');
// rewrite path '/'
var handler = createHandler({ path: '/', secret: '1' });

router.all('/', function (req, res, next) {
  handler(req, res, function (err) {
    // console.log('aaaaaaaaa1', err);
    // res.statusCode = 404;
    // res.end('no such location');
  });
});

handler.on('error', function (err) {
  pullRepo();
  console.error('Error:', err.message);
});

handler.on('push', function (event) {
  pullRepo();
  console.log(
    'Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref
  );
});

function pullRepo() {
  const { exec } = require('child_process');
  const run = `sh "${path.posix.join(
    global.rootPath,
    'routes/deploy.sh'
  )}" "${global.rootPath}"`;
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
