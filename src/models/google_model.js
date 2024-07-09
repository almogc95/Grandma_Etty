const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user_google_schema = new Schema({
    googleId: String,
    displayName: String,
    email: String
});

const UserModel = mongoose.model('user_google_details', user_google_schema);
module.exports = UserModel; 