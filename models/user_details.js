const notes_schema = new mongoose.Schema({
    give: {
        type: String, required: [true, 'Give suggestion is required']
    },
    take: {

    },
    location: {
        
    },
    time: {
        
    },
    notes: {
        
    }
})









const user_schema= new mongoose.Schema({
    
    meil: {
        type: String, required: [true, 'meil is required'],
        validate: {
            validator: function (v) {
                return (v.length >= 1 && v.trim() != '')
            },
            message: 'Name must contain at least one non-blank character'
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