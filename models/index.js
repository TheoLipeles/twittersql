// pull in the Sequelize library
var Sequelize = require('sequelize');
// create an instance of a database connection
// which abstractly represents our app's mysql database
var twitterjsDB = new Sequelize('twitterjs', 'root', null, {
    dialect: "mysql",
    port:    3306,
});

// open the connection to our database
twitterjsDB
  .authenticate()
  .catch(function(err) {
    console.log('Unable to connect to the database:', err);
  })
  .then(function() {
    console.log('Connection has been established successfully.');
  });

var Tweet = require('./tweet')(twitterjsDB);
var User = require('./user')(twitterjsDB);

User.hasMany(Tweet);
Tweet.belongsTo(User);

User.getTweets = function(userId) {
  this.findById(userId).then(function(user) {
    user.getTweets().then(function(tweets) {
      return tweets;
    });
  });
};

User.getUsers = function() {
  var usrs = [];
  this.findAll().then(function(users) {
    // console.log(users);
    usrs = users;
    // return users;
  });
  return usrs;
};

module.exports = {
    User: User,
    Tweet: Tweet,
    getAllTweets: function() {
      var tweets = [];
      User.getUsers().forEach(function(user) {
        console.log(user);
        tweets.concat(User.getTweets(user.id));
      });
      console.log(tweets);
      return tweets;
    }
};