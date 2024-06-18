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

    // תאריך הפגישה
    date: {
        type: Date, 
        required: [true, 'Date is required.'],
        validate: {
            validator: function (v) {
                // לקיחת תאריך היומי ותאריך הפגישה
                const todayDate = new date();
                todayDate.setHours(0,0,0,0);
                const meetingDate = new dat(v);
                meetingDate.setHours(0,0,0,0);

                return meetingDate>=todayDate;
            },
            message: 'Date cannot be from the past.'
        }
    },

    // שעת הפגישה
    time: {
        type: String,
        
    },

    // מיקום הפגישה
    location: {
        
    },

    // ...הערות
    notes: {
        
    },

    // גיל
    age: {

    }
});






// מפתח ID של התופס

const user_schema= new mongoose.Schema({
    
    name: {
        type: String, required: [true, 'NAME is required'],
        validate: {
            validator: function (v) {
                return (v.length >= 1 && v.trim() != '')
            },
            message: 'Name must contain at least one non-blank character'
        }
    },
    



    email: {
        type: String, required: [true, 'emשil is required'],
        validate: {
            validator: function (v) {
                return (v.length >= 1 && v.trim() != '')
            },
            message: 'Must put meul'
        }
},







phone: {
    type:[ 'Allow up to 10 characters with a minimum of 1 character'],
    
    validate: {
        validator: function (v) {
            return (v.length >=5 && v.trim() != '' && !/ /.test(v))
        },
    }

},




password: {
    type: String, required: [true, 'Allow up to 10 characters with a minimum of 1 character'],
    validate: {
        validator: function (v) {
            return (v.length == 10 && v.trim() != '' && !/ /.test(v)) 
        },
    }

} 
});






