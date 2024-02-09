const express = require("express");
const { createQuestion, fetchQuestionDetail, updateQuestion } = require("../controllers/questionController");
const { verifyAccessToken } = require("../middleware/verifyTokens");

const router = express.Router();

router.post("/questions", verifyAccessToken, createQuestion);
router.get("/questions/:questionId", verifyAccessToken, fetchQuestionDetail);
router.put("/questions/:questionId", verifyAccessToken, updateQuestion);

module.exports = router;