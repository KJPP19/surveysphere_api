const express = require("express");
const { fetchSurveyByShareId, submitResponse } = require("../controllers/surveyResponseController");

const router = express.Router();
router.get("/surveys/data/:shareId", fetchSurveyByShareId);
router.post("/surveys/data/submit", submitResponse);

module.exports = router;