var express = require('express');
var router = express.Router();
var path = require('path');

var createHandler = require('github-webhook-handler');
// rewrite path '/'
var handler = createHandler({ path: '/', secret: '402821051@qq.com' });

router.all('/', function (req, res, next) {
  handler(req, res, function (err) {
    pullRepo()
    res.statusCode = 404;
    res.end('no such location');
  });
});

handler.on('error', function (err) {
  console.error('Error:', err.message);
});

handler.on('push', function (event) {
  pullRepo()
  console.log(
    'Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref
  );
});

function pullRepo() {
  const { exec } = require('child_process');
  // todo care about pm2 restart child_process
  exec(
    `sh "${path.posix.join(__dirname, './deploy.sh')} "${__dirname}"`,
    (err, stdout, stderr) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
      }
    }
  );
}

module.exports = router;
