// Google login route
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google login callback
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('/dashboard');  // or send JWT token
});
