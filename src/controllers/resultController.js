const { asyncHandler } = require("../utils/asyncHandler");
const { getResponseSummaryBySurveyId } = require("../services/result/resultSummaryService");

const getResultSummary = asyncHandler(async(req, res) => {
    const summary = await getResponseSummaryBySurveyId(req.params.surveyId);
    res.status(200).json({status:200, data: summary});
});

module.exports = {
    getResultSummary,
};