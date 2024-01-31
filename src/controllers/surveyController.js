const { asyncHandler } = require("../utils/asyncHandler");
const { addNewSurvey } = require("../services/survey/surveyService");

const createSurvey = asyncHandler(async(req, res) => {
    const survey = await addNewSurvey(req.body, req.user.userId);
    res.status(201).json({ status: 201, data: survey });
});

module.exports = {
    createSurvey
};