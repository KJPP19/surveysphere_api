const express = require("express");
const { getResultSummary } = require("../controllers/resultController");
//const { verifyAccessToken } = require("../middleware/verifyTokens");

const router = express.Router();
router.get("/surveys/:surveyId/results/summary", getResultSummary);

module.exports = router;