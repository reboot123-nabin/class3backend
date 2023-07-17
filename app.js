const express = require('express')//package define
const connectdb=require('./database/db');
const user_route=require('./routes/user_routes');
const cors=require('cors');//permission
const path=require('path');

var bodyParser = require('body-parser')

connectdb();

const app = express()//express features use

app.use('/', express.static(path.join(__dirname, 'files')))
app.use(express.json());//json format
app.use(bodyParser.urlencoded({ extended: false }))


//default path change

app.use(cors());//permission
app.use(user_route);//route use from express


//hosting
app.get('/', function (req, res) {
  res.send('Hello World');
  
})
///new thing
app.get('/header', function (req, res) {
  res.send('Hello header');
})

//port no. host
app.listen(4000,function(){
    console.log("it is running at 4000 port");
})