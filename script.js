document.addEventListener("DOMContentLoaded", () => {

    const supabaseUrl = "https://pmmlvynoxfxefvmzhrbo.supabase.co";
    const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtbWx2eW5veGZ4ZWZ2bXpocmJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5MzA4NDgsImV4cCI6MjA4NzUwNjg0OH0.Xt_BmsOw0oJKBg64weyjB2NjHTqpapEeYxXRSpetBrg";

    const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

    const form = document.getElementById("feedbackForm");
    const status = document.getElementById("status");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const button = form.querySelector("button");
        button.disabled = true;
        button.textContent = "Submitting...";
        status.textContent = "Submitting...";

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            status.textContent = "Please fill all fields.";
            button.disabled = false;
            button.textContent = "Submit Feedback";
            return;
        }

        const { error } = await supabaseClient
            .from("feedback")
            .insert([{ name, email, message }]);

        if (error) {
            status.textContent = error.message;
        } else {
            status.textContent = "Feedback submitted successfully!";
            form.reset();
        }

        button.disabled = false;
        button.textContent = "Submit Feedback";
    });

});