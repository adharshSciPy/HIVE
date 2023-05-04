const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Certificate = new Schema({
    studentId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },

    certificate: {
        type: Array,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('Certificate', Certificate);