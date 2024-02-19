const { asyncHandler } = require("../utils/asyncHandler");
const { getSurveyByShareId, submitAnswers, getResponsesBySurveyId } = require("../services/survey/surveyResponseService");

const fetchSurveyByShareId = asyncHandler(async(req, res) => {
    const survey = await getSurveyByShareId(req.params.shareId);
    res.status(200).json({status:200, data: survey});
});

const submitResponse = asyncHandler(async(req, res) => {
    const response = await submitAnswers(req.body);
    res.status(201).json({status:201, data: response});
});


module.exports = {
    fetchSurveyByShareId,
    submitResponse,
};