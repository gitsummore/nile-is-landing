const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.load();

const server = app.listen(process.env.PORT || 3000, () => {
  console.log('Listening on port 3000');
});

const nileServer = require('./nileServer')(server);

// stack of stored cookies
const cookies = {};

app.use(cookieParser());

app.get(['/broadcaster.html', '/broadcaster-full.html'], (req, res) => {
  return res.redirect('/broadcaster');
});

app.get('/broadcaster', (req, res) => {
  // if first client to request this page, allow them to broadcast
  if (Object.keys(cookies).length === 0) {
    // generate arbitrary cookie from current milliseconds
    const cookie = Date.now();

    // send cookie
    res.cookie('broadcasterId', cookie);

    // store cookie
    cookies[cookie] = true;

    res
      // prevent storing page
      .set('Cache-Control', 'no-store')
      .sendFile(`${__dirname}/broadcaster.html`);
  } else {
    res.sendFile(`${__dirname}/broadcaster-full.html`);
  }
});

app.get('/viewer', (req, res) => {
  res.sendFile(`${__dirname}/viewer.html`);
});

// listen for Broadcaster page closes
// remove request's cookie from cookie store
app.get('/broadcaster-disconnect', (req, res) => {
  const cookieToRemove = req.cookies.broadcasterId;

  let message;
  if (cookies[cookieToRemove]) {
    // remove disconnecting client's cookie
    delete cookies[cookieToRemove];
    message = 'Cookie cleared';
  } else {
    message = 'No cookie to clear';
  }
  return res.status(200).send(message);
});

app.use(express.static(__dirname));
app.use('/', nileServer);

function handleError(err) {
  throw err;
}

