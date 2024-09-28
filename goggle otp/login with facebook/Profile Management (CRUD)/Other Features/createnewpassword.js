// Route: Create New Password
app.post('/create-password', async (req, res) => {
    const { email, otp, newPassword } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || user.resetOtp !== otp) return res.status(400).json({ msg: 'Invalid OTP' });

        user.password = await bcrypt.hash(newPassword, 10);
        user.resetOtp = null;
        await user.save();

        res.json({ msg: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
