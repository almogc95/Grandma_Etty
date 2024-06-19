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
                const todayDate = new Date(); // תאריך העכשוי 
                todayDate.setHours(0,0,0,0); // מאפס את השעה לחצות בשביל ההשוואה
                const userDate = new Date(v); // תאריך שהמשתמש הזין
                userDate.setHours(0,0,0,0); // ...מאפס את השעה לחצות

                return userDate>=todayDate;
            },
            message: 'Date cannot be from the past.'
        }
    },

    // שעת הפגישה
    time: {
        type: String,
        required: [true, 'Time is required.'],
        validate:{
            validator: function (v){
                const timeParts=v.split(':');

                // בודק שהוזן רק שעות ודקות
                if(timeParts.length!==2){
                    return false;
                }

                const hours=+time[0];
                const minutes=+time[1];

                // בודק שהזמן שהוזן חוקי
                if(isNaN(hours) || isNaN(minutes) || hours>23 || hours<0 || minutes<0 || minutes>59){
                    return false;
                }

                const now = new Date();
                const userTime = new Date();

                // הזנה למשתנה את הזמן שהזין המשתמש
                userTime.setHours(hours);
                userTime.setMinutes(minutes);
                userTime.setSeconds(0);
                userTime.setMilliseconds(0);

                // בדיקה שהזמן לא מהעבר
                if(this.date){
                    const todayDate = new Date(this.date);
                    if (todayDate.toDateString === now.toDateString) {
                        return userTime >= now;
                    }
                }
                return true;
            },
            message: 'Time cannot be from the past.'
        }
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






