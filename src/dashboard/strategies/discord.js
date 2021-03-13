const DiscordStrategy = require('passport-discord').Strategy;
const passport = require('passport');

const User = require('../../models/users');

passport.serializeUser((user, done) => {
	console.log("Serialize")
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	console.log("Deserialize")
	const user = await User.findById(id);

	if (user) { done(null, user) }
});

passport.use(new DiscordStrategy({
	
	clientID: process.env.WEB_CLIENT_ID,
	clientSecret: process.env.WEB_CLIENT_SECRET,
	callbackURL: process.env.WEB_CALLBACK,
	scope: ['identify', 'guilds']

}, async (accessToken, refreshToken, profile, done) => {
	try {
    
    const user = await User.findOneAndUpdate({ id: profile.id }, {
	    avatar: profile.avatar,
	    discriminator: profile.discriminator,
			username: profile.username,
	    tag: profile.tag,
	    guilds: profile.guilds
  	});

    if(user){
      console.log("User exist");
    
      return done(null, user)
    } else{
    	console.log("User does not exist");

      const newUser = await User.create({
        id: profile.id,
		    avatar: profile.avatar,
		    discriminator: profile.discriminator,
		    username: profile.username,
		    tag: profile.tag,
		    guilds: profile.guilds
      })
    
      return done(null, newUser)
    }
  } catch(err) {
    console.log(err)
    
    return done(err, null)
  }
}));