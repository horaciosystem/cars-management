const express= require('express');
const compression = require('compression');
const path = require('path');
const cors = require('cors');

const app = express();

const static_path = path.join(__dirname, 'public');

app.enable('trust proxy');

app.use(compression());

app.route('/').get(function(req, res) {
    res.header('Cache-Control', 'max-age=60, must-revalidate, private');
    res.sendFile('index.html', {
        root: static_path
    });
});

function nocache(req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
}

app.use('/', express.static(static_path, {
    maxage: 31557600
}));

const server = app.listen(process.env.PORT || 3000, function () {

  const host = server.address().address;
  const port = server.address().port;

  console.log('Cars Management listening at http://%s:%s', host, port);

});