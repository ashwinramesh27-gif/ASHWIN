require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const feedbackRoute = require("./routes/feedback");

const app = express();

app.use(cors({
    origin: function (origin, callback) {
        if (!origin ||
            origin.includes('inquisitive-sunburst-1cff02.netlify.app') ||
            origin.includes('localhost')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

app.use(express.json());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { error: "Too many requests, please try again later." }
});

app.use("/api/feedback", limiter, feedbackRoute);

app.get("/", (req, res) => res.send("Portfolio backend is running!"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
