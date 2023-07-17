
const mongoose = require('mongoose');//mongoose package define


const connectdb=function(){
    mongoose.connect('mongodb://localhost:27017/class3')
  .then(function(){ console.log('Connected!')})
  .catch(()=>console.log('not connected'))
}


module.exports=connectdb;
