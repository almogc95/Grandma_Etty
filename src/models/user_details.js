const mongoose = require('mongoose');


// מפתח ID של התופס
const Schema = mongoose.Schema;

const user_schema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String,
    },
    password: {
        type: String
    }
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