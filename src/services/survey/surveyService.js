const Survey = require("../../models/surveyModel");
const Workspace = require("../../models/workspaceModel");
const shareId = require("./generateShareableId");
const { apiError } = require("../../utils/customError");

const addNewSurvey =async(surveyData, userId) => {
    const { title, workspaceId } = surveyData;
    const shareableId = shareId();
    const newSurvey = await Survey.create({
        title,
        user: userId,
        workspace: workspaceId,
        shareableSurveyId: shareableId,
    });
    await Workspace.findByIdAndUpdate(workspaceId, { $push: { survey: newSurvey._id } })
    return newSurvey;
};

const surveyDetail = async(surveyId, userId) => {
    const survey = await Survey.findOne({_id: surveyId, user: userId})
    .populate({
        path: "questions",
        select: "-user"
    });
    if(!Survey){
        throw new apiError("survey not found", 404);
    };
    return survey;
};

const updateSurvey = async(surveyData, surveyId, userId) => {
    const { isEnabled } = surveyData;
    const survey = await Survey.findByIdAndUpdate(
        {_id: surveyId, user: userId},
        {isEnabled},
        {new: true},
    ).populate({
        path: "questions",
        select: "-user"
    });
    if(!survey){
        throw new apiError("survey failed to update", 400);
    };
    return survey;
};

module.exports = {addNewSurvey, surveyDetail, updateSurvey};
