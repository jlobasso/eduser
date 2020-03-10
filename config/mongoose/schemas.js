const mongoose = require('./connect'),
      Schema = mongoose.Schema;

const schemas = {
    
    userSchema: new Schema({
        name: {
            firstName: String,
            lastName: String,
            email: String,
            telefono: Number
        },
        created: Date
    }),

    authorSchema: new Schema ({
        _id: mongoose.Schema.Types.ObjectId,
        name: {
            firstName: String,
            lastName: String
        },
        biography: String,
        twitter: String,
        facebook: String,
        linkedin: String,
        profilePicture: Buffer,
        created: { 
            type: Date,
            default: Date.now
        }
    
    }) 
    

};

module.exports = schemas;