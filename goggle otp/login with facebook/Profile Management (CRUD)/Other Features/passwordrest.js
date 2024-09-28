const nodemailer = require('nodemailer');

app.post('/reset-password', async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'User not found' });

    const otp = Math.floor(100000 + Math.random() * 900000); // Generate OTP
    user.resetOtp = otp;
    await user.save();

    // Send OTP via email using nodemailer
    const transporter = nodemailer.createTransport({ /* SMTP Config */ });
    await transporter.sendMail({
        to: email,
        subject: 'Password Reset OTP',
        text: `Your OTP is: ${otp}`
    });

    res.json({ msg: 'OTP sent to your email' });
});
