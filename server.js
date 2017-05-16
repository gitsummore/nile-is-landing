const express = require('express');
const app = express();
const dotenv = require('dotenv');

dotenv.load();

// app.use(requireHTTPS);

const server = app.listen(process.env.PORT || 3000, () => {
  console.log('Listening on port 3000');
});

// const nileServer = require('nile.js/nileServer')(server);

app.use(express.static(__dirname));
// app.use('/', nileServer);

// function requireHTTPS(req, res, next) {
//    if (!req.secure) {
//        //FYI this should work for local development as well
//        return res.redirect('https://' + req.get('host') + req.url);
//    }
//    next();
// }

