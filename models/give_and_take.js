const mongoose = require('mongoose');

// סכמה של הפתקים
const notes_schema = new mongoose.Schema({
    // מה המשתמש נותן
    give: {
        type: String, 
        required: [true, 'Giving something is required.'],
        validate: {
            validator: function (v) {
                return (v.length>2 && v.trim()!='');
            }
        }
    },

    // מה המשתמש לוקח
    take: {
        type: String,
        required: [true, 'Asking for something is required.'],
        validate: {
            validator: function (v) {
                return (v.length>2 && v.trim()!='');
            }
        }
    },

    // שעת הפגישה
    Date_time: {
        type: Date,
        required: [true, 'Time is required.'],
        validate:{
            validator: function (v) {
            const now = new Date();
                return v >= now;
            },
            message: 'Time cannot be from the past.'
        }
    },

    // סיום הפגישה
    until: {
        type: Date,
        validate: {
            validator: function (v){
                if(this.Date_time){
                    const oneHourLater = new Date(this.Date_time.getTime() + 3600000);
                    return v >= oneHourLater;
                }
                return false;
            },
            message: 'End time must be at least one hour after the start time.'
        }
    },

    // מיקום הפגישה
    location: {
        type: String,
        required: [true, 'Location is required']
    },

    // גיל
    age: {
        type: Number


    },

    // ...הערות
    notes: {
        
    }
});

