const mongoose = require('mongoose');

const publicationSchema = mongoose.Schema({
    title: {
       type: String,
       required: true
    },
    teacherid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    authors: {
        type: String,
        required: true
    },
    information: {
        type: String,
    },
    year: {
        type: Number,
        required: true
    }

})

exports.Publication = mongoose.model('Publication', publicationSchema);