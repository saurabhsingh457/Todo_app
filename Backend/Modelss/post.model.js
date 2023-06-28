const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }
});


const PostModel=mongoose.model('User',postSchema)
module.exports = {PostModel}