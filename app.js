const express = require('express');
const path = require('path');
const http = require('http');
const config = require('./config/configs');

// Set up the express app
const app = express();

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

let server = http.createServer(app);

server = app.listen(port, () => {
    console.log('Server started on http://localhost:' + port);
  });

//= =======================================
// Enable CORS from client-side
//= =======================================
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', config.domain);
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

//========================================
// Enable body-parser
//========================================
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

//========================================
// set static folder (angular)
//========================================
app.use(express.static('ceres-react-frontend/build'));


//========================================
// get Dist (angular)
//========================================
require('./server/routes')(app);
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'ceres-react-frontend', 'build', 'index.html'));
});

module.exports = app;