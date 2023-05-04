const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    gender: {
        type: String
    },

    dob: {
        type: Date
    },

    college: {
        type: String
    },

    course: {
        type: String
    },
    certficate: [Object],
    createdAt: { type: Date, default: Date.now }
})


module.exports = mongoose.model("user", UserSchema);


