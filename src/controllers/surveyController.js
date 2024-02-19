const { asyncHandler } = require("../utils/asyncHandler");
const { addNewSurvey, surveyDetail, updateSurvey } = require("../services/survey/surveyService");

const createSurvey = asyncHandler(async(req, res) => {
    const survey = await addNewSurvey(req.body, req.user.userId);
    res.status(201).json({ status: 201, data: survey });
});

const fetchSurveyDetail = asyncHandler(async(req, res) => {
    const detail = await surveyDetail(req.params.surveyId, req.user.userId);
    res.status(200).json({status:200, data: detail});
});

const updateSurveyData = asyncHandler(async(req, res) => {
    const survey = await updateSurvey(req.body, req.params.surveyId, req.user.userId);
    res.status(200).json({status:200, data: survey});
})


module.exports = {
    createSurvey,
    fetchSurveyDetail,
    updateSurveyData,
};