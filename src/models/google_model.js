const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// סכמה של הפתקים
const notes_schema = new Schema({
    // מה המשתמש נותן
    give: {
        type: String,       
    },

    // מה המשתמש לוקח
    take: {
        type: String,
    },

    // תחילת הפגישה
    Date_time: {
        type: Date,      
    },

    // סיום הפגישה
    until: {
        type: Date,        
    },

    // מיקום הפגישה
    location: {
        type: String,
    },

    // ...הערות
    notes: {
        type: String,        
    },
    taken: {
        type: Boolean,
        default: false
    },
    takenBy: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'User',
        type: String,
        default: null
    }
});


const user_google_schema = new Schema({
    googleId: String,
    displayName: String,
    email: String,
    picture: String,
    phone: {
        type: String,
        default: ""
    },
    ads: [notes_schema]
});

const UserModel = mongoose.model('user_google_details', user_google_schema);
module.exports = UserModel; 