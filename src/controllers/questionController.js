const { asyncHandler } = require("../utils/asyncHandler");
const { addNewQuestion, questionDetail, updateQuestionDetail } = require("../services/question/questionService");

const createQuestion = asyncHandler(async(req, res) => {
    const question = await addNewQuestion(req.body, req.user.userId);
    res.status(201).json({status:201, data: question});
});

const fetchQuestionDetail = asyncHandler(async(req, res) => {
    const detail = await questionDetail(req.params.questionId, req.user.userId);
    res.status(200).json({status:200, data: detail});
});

const updateQuestion = asyncHandler(async(req, res) => {
    const update = await updateQuestionDetail(req.params.questionId, req.body, req.user.userId);
    res.status(200).json({status:200, data : update});
})

module.exports = {
    createQuestion,
    fetchQuestionDetail,
    updateQuestion,
};