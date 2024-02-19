const SurveyResponse = require("../../models/surveyResponseModel");
const mongoose = require('mongoose');
const getResponseSummaryBySurveyId = async(surveyId) => {
    const response = await SurveyResponse.aggregate([
        {$match: { survey: new mongoose.Types.ObjectId(surveyId) } },
        {$unwind: "$responses"},
        {
            $group: {
                _id: "$responses.question",
                answers: {$push: {
                    value: "$responses.answer",
                    answeredAt: "$responses.answeredAt"
                }}
            }
        },
        {
            $lookup: {
                from: "questions", 
                localField: "_id", 
                foreignField: "_id", 
                as: "questionData"
            }
        },
        {
            $addFields: {
                questionData: {$arrayElemAt: ["$questionData", 0]}
            }
        },
        {
            $project: {
                _id: 0,
                "questionData.title": 1,
                "questionData.questiontype": 1,
                "questionData.labels": 1,
                answers:1,
            }
        }
    ]);
    return { surveyId, responses: response };
};

module.exports = { getResponseSummaryBySurveyId }