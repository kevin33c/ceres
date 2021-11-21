const express = require('express');
const path = require('path');

//initial app
const app = express();
//assign port
const port = process.env.PORT || 3000;

//= =======================================
// connect to port
//= =======================================
//set port
let server;
server = app.listen(port, () => {
  console.log('Server started on http://localhost:' + port);
});


//= =======================================
// Enable body-parser
//= =======================================
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


//= =======================================
// set static folder (angular)
//= =======================================
app.use(express.static(path.join(__dirname, 'dist')));



//= =======================================
// set up Index Route
//= =======================================
app.get('/', (req, res) => {
    res.send('invaild endpoint');
  });


//= =======================================
// get Dist (angular)
//= =======================================
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });