const express = require('express');
const path = require('path');
const config = require('./config/configs');
const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize(config.rds_db,config.rds_username, config.rds_password, {
  host: config.rds_hostname,
  port: config.rds_port,
  dialect: "mysql"
});

sequelize.authenticate().then(() => {
  console.log("Connected to the database...");
})
.catch(err => {
  console.log("Cannot connect to the database!", err);
});

//initial app
const app = express();
//assign port
const port = process.env.PORT || 3000;

//=========================================
// connect to port
//=========================================
//set port
let server;
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
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });