const mongoose = require("mongoose");

const surveyResponseSchema = new mongoose.Schema({
    survey: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Survey",
    },
    responses: [
        {
            _id: false,
            question: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Question"
            },
            answer: String
        }
    ]
},{timestamps: true},);

module.exports = mongoose.model("SurveyResponse", surveyResponseSchema);