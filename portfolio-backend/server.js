require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const feedbackRoute = require("./routes/feedback");

const app = express();

app.use(cors({
    origin: [
        "https://69be7e3ee3502b810c8f1b21--inquisitive-sunburst-1cff02.netlify.app",
        "https://69bfe843f960f6a8c01663ec--inquisitive-sunburst-1cff02.netlify.app",
        "https://inquisitive-sunburst-1cff02.netlify.app",
        "http://localhost:5500"
    ]
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
