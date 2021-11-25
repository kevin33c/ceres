const express = require('express');
const path = require('path');
const http = require('http');

// Set up the express app
const app = express();

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

let server = http.createServer(app);

server = app.listen(port, () => {
    console.log('Server started on http://localhost:' + port);
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
app.use(express.static(path.join(__dirname, 'dist')));



//========================================
// set up Index Route
//========================================
app.get('/', (req, res) => {
    res.send('invaild endpoint');
  });


//========================================
// get Dist (angular)
//========================================
require('./server/routes')(app);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });

module.exports = app;