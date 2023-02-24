const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },

    postType: {
        type: String,
        required: true,
    },

    price: {
        type: String,
    },

    date: {
        type: String,
    },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("posts", PostSchema);
