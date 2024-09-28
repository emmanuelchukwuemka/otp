// Facebook login route
app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

// Facebook login callback
app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('/dashboard');  // or send JWT token
});
