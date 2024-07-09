const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// סכמה של הפתקים
const notes_schema = new Schema({
    // מה המשתמש נותן
    give: {
        type: String,
        // required: [true, 'Giving something is required.'],
        // validate: {
        //     validator: function (v) {
        //         return (v.length > 2 && v.trim() != '');
        //     }
        // }
    },

    // מה המשתמש לוקח
    take: {
        type: String,
        // required: [true, 'Asking for something is required.'],
        // validate: {
        //     validator: function (v) {
        //         return (v.length > 2 && v.trim() != '');
        //     }
        // }
    },

    // תחילת הפגישה
    Date_time: {
        type: Date,
        // required: [true, 'Time is required.'],
        // validate: {
        //     validator: function (v) {
        //         const now = new Date();
        //         return v >= now;
        //     },
        //     message: 'Time cannot be from the past.'
        // }
    },

    // סיום הפגישה
    until: {
        type: Date,
        // validate: {
        //     validator: function (v) {
        //         if (this.Date_time) {
        //             const oneHourLater = new Date(this.Date_time.getTime() + 3600000);
        //             return v >= oneHourLater;
        //         }
        //         return false;
        //     },
        //     message: 'End time must be at least one hour after the start time.'
        // }
    },

    // מיקום הפגישה
    location: {
        type: String,
        // required: [true, 'Location is required']
    },

    // ...הערות
    notes: {
        type: String,
    }
});


const user_schema = new Schema({
    signUp_email: {
        type: String,
        require: true
    },
    signUp_user_name: {
        type: String,
        require: true
    },
    signUp_password: {
        type: Number,
        require: true
    },
    signUp_bio: {
        type: String
    },
    messages: [notes_schema]
});

// old code
// const user_schema = new Schema({
//     name: {
//         type: String, required: [true, 'NAME is required'],
//         validate: {
//             validator: function (v) {
//                 return (v.length >= 1 && v.trim() != '')
//             },
//             message: 'Name must contain at least one non-blank character'
//         }
//     },
//     email: {
//         type: String, required: [true, 'Email is required'],
//         validate: {
//             validator: function (v) {
//                 return (v.length >= 1 && v.trim() != '')
//             },
//             message: 'Must put meul'
//         }
//     },
//     phone: {
//         type: String, required: ['Allow up to 10 characters with a minimum of 1 character'],

//         validate: {
//             validator: function (v) {
//                 return (v.length >= 5 && v.trim() != '' && !/ /.test(v))
//             },
//         }

//     },
//     password: {
//         type: String, required: [true, 'Allow up to 10 characters with a minimum of 1 character'],
//         validate: {
//             validator: function (v) {
//                 return (v.length == 10 && v.trim() != '' && !/ /.test(v))
//             },
//         }

//     }
//     // age: {
//     //     type: [''],

//     //     validate: {
//     //         validator: function (v) {
//     //             return (v.length >= 5 && v.trim() != '' && !/ /.test(v))
//     //         },
//     //     }

//     // }

// });

const UserModel = mongoose.model('user_details', user_schema);
module.exports = UserModel; 