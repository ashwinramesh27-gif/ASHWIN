document.addEventListener("DOMContentLoaded", () => {

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

        const res = await fetch("https://portfolio-backend-sx1t.onrender.com/api/feedback", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, message })
        });

        const data = await res.json();

        if (!res.ok) {
            status.textContent = data.error || "Something went wrong.";
            status.style.color = "#ff4444";
        } else {
            status.textContent = "Feedback submitted successfully!";
            status.style.color = "#00ffd5";
            form.reset();
        }

        button.disabled = false;
        button.textContent = "Submit Feedback";
    });

});
