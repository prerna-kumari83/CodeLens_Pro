

const generateContent = require("../service/ai.service");

module.exports.getReview = async (req, res) => {
  const code = req.body.code;

  if (!code) return res.status(400).send("Code is required.");

  try {
    const review = await generateContent(code); // ✅ don't reuse "code"
    res.send(review);
  } catch (err) {
    console.error("AI error:", err);

    if (err.status === 503) {
      return res.status(503).send("The Gemini model is overloaded. Please try again shortly.");
    }

    res.status(500).send("An unexpected error occurred.");
  }
};
