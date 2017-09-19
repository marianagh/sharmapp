const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
     text: String,
     photo: { String},
     user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User'
        },
     postOn: {Date},
     postTo: {
         facebook: Boolean,
         twitter: Boolean,
         instagram: Boolean, 
         google: Boolean
        }
 },
    {timestamps:true});

    module.exports = mongoose.model('Post', postSchema);