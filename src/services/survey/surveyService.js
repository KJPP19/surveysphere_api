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

module.exports = {addNewSurvey};
