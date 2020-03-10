const mongoose = require('./connect'),
userSchema = require('./schemas').userSchema;

const models = {

    User: mongoose.model('User', userSchema)

};

module.exports = models;