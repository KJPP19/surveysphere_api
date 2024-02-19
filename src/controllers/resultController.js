const { asyncHandler } = require("../utils/asyncHandler");
const { getResponseSummaryBySurveyId } = require("../services/result/resultSummaryService");
const { getResponsesByDateAndTime } = require("../services/result/resultTableServices");

const getResultSummary = asyncHandler(async(req, res) => {
    const summary = await getResponseSummaryBySurveyId(req.params.surveyId);
    res.status(200).json({status:200, data: summary});
});

const getResultTable = asyncHandler(async(req, res) => {
    const table = await getResponsesByDateAndTime(req.params.surveyId);
    res.status(200).json({status:200, data: table});
})

module.exports = {
    getResultSummary,
    getResultTable,
};