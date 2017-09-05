const mongoose = require('mongoose');
 const PostSchema = new mongoose.Schema({
     text: String,
     photo: { String},
     user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User'
        }
 },
    {timestamps:true});

    module.exports = mongoose.model('User', userSchema);