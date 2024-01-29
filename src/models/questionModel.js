const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    questiontype: {
        type: String,
        enum: ["form", "essay", "multiple choice", "scale", null],
        default: null,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    isRequired: {
        type: Boolean, 
        default: false,
    },
    labels: {
        type: [String],
    },
    survey: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Survey",
    },
},{timestamps: true},);

module.exports = mongoose.model("Question", questionSchema);