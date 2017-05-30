const express = require('express');
const app = express();

const server = app.listen(process.env.PORT || 3000, () => {
  console.log('Listening on port 3000');
});

const nileServer = require('./nileServer')(server);
// const nileServer = require('nile.js/nileServer')(server);

app.get('/broadcaster', (req, res) => {
  return res.sendFile(`${__dirname}/broadcaster.html`);
});

app.get('/viewer', (req, res) => {
  return res.sendFile(`${__dirname}/viewer.html`);
});

// // listen for Broadcaster page closes
// // remove request's cookie from cookie store
// app.get('/broadcaster-disconnect', (req, res) => {
//   const cookieToRemove = req.cookies.broadcasterId;

//   let message;
//   if (cookies[cookieToRemove]) {
//     // remove disconnecting client's cookie
//     delete cookies[cookieToRemove];
//     message = 'Cookie cleared';
//   } else {
//     message = 'No cookie to clear';
//   }
//   return res.status(200).send(message);
// });

app.use(express.static(__dirname));
app.use('/', nileServer);

function handleError(err) {
  throw err;
}

