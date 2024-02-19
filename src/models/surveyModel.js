const mongoose = require("mongoose");

const surveySchema = new mongoose.Schema({
    title: {
        type: String,
        reqiured: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    isEnabled: {
        type: Boolean,
        default: false,
    },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref:"Question" }],
    workspace: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workspace",
    },
    shareableSurveyId: {
        type: String,
    },
    numberOfResponses: {
        type: Number,
        default: 0,
    },
},{timestamps: true},);

module.exports = mongoose.model("Survey", surveySchema);