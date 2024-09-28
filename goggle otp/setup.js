// Route: Manual Sign Up
app.post('/signup', async (req, res) => {
    const { username, email, phone, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ msg: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, phone, password: hashedPassword });
        await newUser.save();

        // Send OTP to user's phone or email
        const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
        // Store OTP in DB (or use redis for expiry)
        newUser.otp = otp;
        await newUser.save();

        // Send OTP to user's email/phone (use nodemailer for email, or SMS service)
        res.status(201).json({ msg: 'User registered, OTP sent' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
