var Tweet = require('./models/').Tweet;


Tweet.findById(1).then(function(Tweet) {
	console.log(Tweet);
    Tweet.getUsers().then(function(tweets) {
        console.log(tweets);
  });
});