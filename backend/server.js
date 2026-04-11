const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// API Route for Assessment
app.post("/api/analyze", (req, res) => {
    const { stress, sleep, motivation, anxiety } = req.body;

    if (
        stress == null ||
        sleep == null ||
        motivation == null ||
        anxiety == null
    ) {
        return res.status(400).json({ error: "All fields are required!" });
    }

    const score = stress + sleep + motivation + anxiety;
    const percentage = (score / 40) * 100;

    let status = "";
    let description = "";

    if (score <= 12) {
        status = "Healthy Mental State";
        description =
            "Your stress indicators are within a balanced range. Maintain healthy routines.";
    } else if (score <= 25) {
        status = "Moderate Stress Level";
        description =
            "You show moderate stress patterns. Consider rest and stress management practices.";
    } else {
        status = "High Stress Level";
        description =
            "Your responses indicate high stress. Professional guidance or lifestyle adjustments are recommended.";
    }

    res.json({
        score,
        percentage,
        status,
        description
    });
});

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});