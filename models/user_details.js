const mongoose = require('mongoose');

// סכמה של הפתקים
const notes_schema = new mongoose.Schema({
    give: {
        type: String, required: [true]
    },
    take: {

    },
    date: {
        
    },
    time: {
        
    },
    notes: {
        
    },
    location: {
        
    },
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
    



    mail: {
        type: String, required: [true, 'mשil is required'],
        validate: {
            validator: function (v) {
                return (v.length >= 1 && v.trim() != '')
            },
            message: 'Must put meul'
        }
},







password: {
    type: String, required: [true, 'password is required'],
    validate: {
        validator: function (v) {
            return (v.length == 9 && v.trim() != '' && !/ /.test(v)) 
        },
    }

}});