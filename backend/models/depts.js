const mongoose = require('mongoose');

const deptSchema = mongoose.Schema({
    deptname: {
        type: String,
        required: true
    },
    buildno: {
        type: Number
    },
    teachers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    }]
})

exports.Dept = mongoose.model('Dept', deptSchema);