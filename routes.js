var express = require('express');
var router = express.Router();
module.exports = router;
var tweetBank = require('./tweetbank');
var fs = require('fs');
var model = require('./models/');
var User = model.User;
var Tweet = model.Tweet;

router.get('/', function(req, res, next) {
  	// res.json(tweetBank.list())
  	Tweet.findAll({include: [ User ]}).then(function(tweets) {
  	  	res.render('index', {
		    tweets: tweets
		});
  	});

});

router.post('/', function(req, res, next) {
	var numUsers = 0;
	User.findAll().then(function(users) {numUsers = users.length});
	console.log(req.body);
	User.findOne({where: {name: req.body.name}}).then(function(user) {
		Tweet.create({tweet: req.body.tweet, UserId: user.id});
	}).catch(function(e) {
		User.create({name: req.body.name, id: numUsers + 1});
		Tweet.create({tweet: req.body.tweet, UserId: numUsers + 1});
	});
  	res.status(201).end();
});

router.get('/users/:user', function(req, res, next) {
  	// var tweets = tweetBank.find({ name: req.params.user });
  	User.findOne({where:{name:req.params.user}}).then(function(user){
  		Tweet.findAll({where:{UserId:user.id}}).then(function(tweets){
  			res.render('index', { tweets: tweets });		
  		});
  	});
  	
});

router.delete('/', function(req, res, next) {
	Tweet.findOne({where:{id:req.body.id}}).then(function(tweet){
		tweet.destroy();
	});
	res.status(204).end();
});


// example without static file server
// router.get('/style.css', function(req, res) {
//   fs.readFile('./public/style.css', function(err, contentBuffer) {
//     var css = contentBuffer.toString()
//     res.header('Content-Type', 'text/css')
//     res.send(css)
//   })
// })





