const Survey = require("../../models/surveyModel");
const SurveyResponse = require("../../models/surveyResponseModel");
const { apiError } = require("../../utils/customError");

const getSurveyByShareId = async(shareId) => {
    const survey = await Survey.findOne({shareableSurveyId: shareId})
    .populate({
        path: "questions",
        select: "-user",
    });
    if(!survey){
        throw new apiError("survey not found", 404);
    };
    return survey;
};

const submitAnswers = async(answersData) => {
    const { survey, responses } = answersData;
    
    const response = await SurveyResponse.create({survey:survey, responses:responses});
    return response;
};

module.exports = { getSurveyByShareId, submitAnswers };