// Route: Verify OTP
app.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || user.otp !== otp) return res.status(400).json({ msg: 'Invalid OTP' });

        user.otp = null; // Clear OTP after successful verification
        user.isVerified = true;
        await user.save();

        res.status(200).json({ msg: 'OTP verified successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
