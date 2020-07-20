var express = require('express');
var router = express.Router();

var createHandler = require('github-webhook-handler');
// rewrite path '/'
var handler = createHandler({ path: '/', secret: '402821051@qq.com' });

router.post('/', function (req, res, next) {
  handler(req, res, function (err) {
    res.statusCode = 404;
    res.end('no such location');
  });
});

handler.on('error', function (err) {
  console.error('Error:', err.message);
});

handler.on('push', function (event) {
  // todo 
  console.log(
    'Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref
  );
});

module.exports = router;
