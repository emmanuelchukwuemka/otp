const FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: 'YOUR_FACEBOOK_APP_ID',
    clientSecret: 'YOUR_FACEBOOK_APP_SECRET',
    callbackURL: "/auth/facebook/callback",
    profileFields: ['id', 'emails', 'name']
}, async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ facebookId: profile.id });
    if (existingUser) return done(null, existingUser);

    const newUser = new User({
        facebookId: profile.id,
        username: `${profile.name.givenName} ${profile.name.familyName}`,
        email: profile.emails[0].value,
        isVerified: true
    });
    await newUser.save();
    done(null, newUser);
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => User.findById(id, (err, user) => done(err, user)));
