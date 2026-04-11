// FORM PAGE LOGIC (assessment.html)
const form = document.getElementById("assessmentForm");

if (form) {
    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const data = new FormData(form);

        const stress = parseInt(data.get("stress"));
        const sleep = parseInt(data.get("sleep"));
        const motivation = parseInt(data.get("motivation"));
        const anxiety = parseInt(data.get("anxiety"));

        try {
            // Send data to backend API
            const response = await fetch("http://localhost:5000/api/analyze", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    stress,
                    sleep,
                    motivation,
                    anxiety
                })
            });

            const result = await response.json();

            if (result.error) {
                alert(result.error);
                return;
            }

            // Store result in localStorage
            localStorage.setItem("assessmentResult", JSON.stringify(result));

            // Redirect to result page
            window.location.href = "result.html";

        } catch (error) {
            alert("Backend not running! Start backend server first.");
            console.log(error);
        }
    });
}


// RESULT PAGE LOGIC (result.html)
const storedData = localStorage.getItem("assessmentResult");

if (storedData) {
    const result = JSON.parse(storedData);

    const statusText = document.getElementById("statusText");
    const descriptionText = document.getElementById("descriptionText");
    const scoreText = document.getElementById("scoreText");
    const progressBar = document.getElementById("progressBar");

    statusText.textContent = result.status;
    descriptionText.textContent = result.description;
    scoreText.textContent = "Total Score: " + result.score + " / 40";

    setTimeout(() => {
        progressBar.style.width = result.percentage + "%";
    }, 200);

    if (result.score <= 12) {
        progressBar.style.backgroundColor = "#10b981"; // Green
    }
    else if (result.score <= 25) {
        progressBar.style.backgroundColor = "#f59e0b"; // Yellow
    }
    else {
        progressBar.style.backgroundColor = "#ef4444"; // Red
    }
}