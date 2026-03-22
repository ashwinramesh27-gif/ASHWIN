const express = require("express");
const router = express.Router();
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

router.post("/", async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required." });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: "Invalid email address." });
    }

    if (message.length > 1000) {
        return res.status(400).json({ error: "Message too long." });
    }

    const { error } = await supabase
        .from("feedback")
        .insert([{ name: name.trim(), email: email.trim(), message: message.trim() }]);

    if (error) {
        console.error("Supabase error:", error.message);
        return res.status(500).json({ error: "Failed to save feedback." });
    }

    res.status(200).json({ success: true, message: "Feedback received!" });
});

module.exports = router;
