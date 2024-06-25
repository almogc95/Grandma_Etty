const mongoose = require('mongoose');


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
        type: String, required: [true, 'Email is required'],
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

    } ,




    age: {
        type:[ ''],
        
        validate: {
            validator: function (v) {
                return (v.length >=5 && v.trim() != '' && !/ /.test(v))
            },
        }

    },

    });

    const user = global.user_details.model('', user_schema);
    module.exports = user;