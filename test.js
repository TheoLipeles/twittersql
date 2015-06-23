var User = require('./models/').User;


User.findById(1).then(function(user) {
	console.log(user);
    user.getTweets().then(function(tweets) {
        console.log(tweets);
  });
});