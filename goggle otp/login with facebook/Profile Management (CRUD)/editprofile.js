// Route: Edit Profile
app.put('/profile', async (req, res) => {
    const { username, email, phone, profileImage } = req.body;

    try {
        const user = await User.findById(req.user.id);
        user.username = username || user.username;
        user.email = email || user.email;
        user.phone = phone || user.phone;
        user.profileImage = profileImage || user.profileImage;

        await user.save();
        res.json({ msg: 'Profile updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
