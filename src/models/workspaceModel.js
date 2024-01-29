const mongoose = require("mongoose");

const workspaceSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    survey: [{type: mongoose.Schema.Types.ObjectId, ref: "Survey"}],
}, {timestamps: true},);

module.exports = mongoose.model("Workspace", workspaceSchema);