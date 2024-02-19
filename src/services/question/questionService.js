const Survey = require("../../models/surveyModel");
const Question = require("../../models/questionModel");
const { apiError } = require("../../utils/customError");

const addNewQuestion = async (questionData, userId) => {
    const { questiontype, surveyId } = questionData;
    const newQuestion = await Question.create({
        questiontype,
        user: userId,
        survey: surveyId,
    });
    await Survey.findByIdAndUpdate(surveyId, {$push: {questions: newQuestion._id} });
    return newQuestion;
};

const questionDetail = async(questionId, userId) => {
    const question = await Question.findOne({_id: questionId, user: userId});
    if (!question) {
        throw new apiError("question not found", 404);
    };
    return question;
};

const updateQuestionDetail = async(questionId, questionData, userId) => {
    const {title, labelstoadd, labelstoremove, range, isRequired, questiontype} = questionData;
    const updateOperations = {};

    if(title){
        updateOperations.title = title;
    }

    if(labelstoadd && labelstoadd.length > 0) {
        updateOperations.$push = {labels: {$each: labelstoadd}};
    }

    if(labelstoremove && labelstoremove.length > 0) {
        updateOperations.$pull = {labels: {$in: labelstoremove}};
    }

    if(range && range.length === 2){
        updateOperations.labels = range;
    };

    if(typeof isRequired !== 'undefined'){
        updateOperations.isRequired = isRequired;
    };

    if(questiontype){
        updateOperations.questiontype = questiontype;
        updateOperations.labels = [];
    };

    updateOperations.user = userId

    const question = await Question.findByIdAndUpdate(questionId, updateOperations, {new:true});
    if(!question) {
        throw new apiError("question update failed", 400);
    }
    return question;
};

const deleteQuestionData = async (questionId, userId) => {
    const deleteQuestion = await Question.findByIdAndDelete({
        _id: questionId,
        user: userId,
    });
    await Survey.updateOne(
        {_id: deleteQuestion.survey},
        {$pull : { questions: questionId }},
    );
    return deleteQuestion;
};

module.exports = {
    addNewQuestion, 
    questionDetail,
    updateQuestionDetail,
    deleteQuestionData,
};