const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/complaint', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => { 
    console.log('MongoDB connection');
})
  .catch(err => console.log(err));

module.exports = mongoose;
