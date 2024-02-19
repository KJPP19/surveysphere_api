const SurveyResponse = require("../../models/surveyResponseModel");
const mongoose = require('mongoose');
const getResponsesByDateAndTime = async(surveyId) => {
    const response = await SurveyResponse.aggregate([
        {$match: { survey: new mongoose.Types.ObjectId(surveyId) }},
        {$unwind: "$responses"},
        
        {
            $group: {
                _id: {
                    date: { $dateToString: { format: "%Y-%m-%d", date: "$responses.answeredAt", timezone: "Asia/Manila" } },
                    time: { $dateToString: { format: "%H:%M:%S", date: "$responses.answeredAt", timezone: "Asia/Manila" } }
                },
                answers: {$push: {
                    value: "$responses.answer",
                    question: "$responses.question"
                }}
            }
        },
        {
            $project: {
                _id: 1,
                answers:1,
            }
        }
    ]);
    return { surveyId, responses: response };
};

module.exports = {getResponsesByDateAndTime};