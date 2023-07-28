const mongoose = require('mongoose');

const teacherSchema = mongoose.Schema({
    name: {
       type: String,
       required: true
    },
    dept: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dept',
        required: true
    },
    post: {
        type: String,
        required: true
    },
    qualification: {
        type: [String],
        required: true
    },
    mail: String,
    img: {
        type: String,
        default: ''
    },
    phno: String,
    interestfield: [String],
    bio: String,
    publication: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Publication' 
    }

})

exports.Teacher = mongoose.model('Teacher', teacherSchema);