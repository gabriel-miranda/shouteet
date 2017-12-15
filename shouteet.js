'use latest';
var TwitterPackage = require('twitter');

module.exports = (ctx, done) => {
  const secret = {
    "consumer_key": ctx.data.consumer_key,
    "consumer_secret": ctx.data.consumer_secret,
    "access_token_key": ctx.data.token_key,
    "access_token_secret": ctx.data.access_token_secret
  };

  //make a new Twitter object
  var twitter = new TwitterPackage(secret);

  twitter.post('statuses/update', {status: ctx.data.status},  (error, tweet, response) => {
    if (error) {
      done(error);
    } else if (!ctx.data.status) {
      done('You must provide a status');
    } else {
      done(null, {status: tweet.text});
    }
  });
}