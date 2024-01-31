const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const userRoutes = require("./routes/userRoutes");
const workspaceRoutes = require("./routes/workspaceRoutes");
const surveyRoutes = require("./routes/surveyRoutes");
const { errorHandler } = require("./middleware/globalErrorHandler");

dotenv.config();
const app = express();
app.use(cors({
    origin: ["https://surveysphere-i9te.onrender.com", "http://localhost:5173"],
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send("SurveySphere");
});
app.use("/api/v1", userRoutes);
app.use("/api/v1", workspaceRoutes);
app.use("/api/v1", surveyRoutes);

app.use(errorHandler);

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
        console.log("connected to mongodb");
        app.listen(8000, () => {
            console.log("running on port 8000");
        });
    } catch (error) {
        console.error("failed to start server", error);
    };
};

startServer();
