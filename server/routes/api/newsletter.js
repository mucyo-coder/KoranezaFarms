const express = require("express");
const router = express.Router();

router.post("/subscribe", async (req, res) => {
	const email = req.body.email;

	if (!email) {
		return res.status(400).json({ error: "You must enter an email address." });
	}

	//TODO: use mailchimp again when available
	// const result = await mailchimp.subscribeToNewsletter(email);

	if (result.status === 400) {
		return res.status(400).json({ error: result.title });
	}

	//TODO: use mailgun again when available
	// await mailgun.sendEmail(email, 'newsletter-subscription');

	res.status(200).json({
		success: true,
		message: "You have successfully subscribed to the newsletter",
	});
});

module.exports = router;
