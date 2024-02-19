const express = require("express");
const { getResultSummary, getResultTable } = require("../controllers/resultController");
//const { verifyAccessToken } = require("../middleware/verifyTokens");

const router = express.Router();
router.get("/surveys/:surveyId/results/summary", getResultSummary);
router.get("/surveys/:surveyId/results/table", getResultTable);

module.exports = router;