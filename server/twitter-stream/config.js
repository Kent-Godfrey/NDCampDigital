const dotenv = require('dotenv').config();

/**
 * Initialise config object
 * This contains:
 *  1. The keys for accessing the Twitter API
 *  2. The name of the file to read and write to
 *  3. The maximum number of tweets to be used
 *  4. The keyword to track on Twitter
 */
const config = {
    "keys"       : {
        "consumer_key"        : process.env.CONSUMER_KEY,
        "consumer_secret"     : process.env.CONSUMER_SECRET,
        "access_token_key"    : process.env.ACCESS_TOKEN_KEY,
        "access_token_secret" : process.env.ACCESS_TOKEN_SECRET
    },
    "output"     : "tweets.json",
    "max_tweets" : 50,
    "params"     : { "track" : "javascript" },
    "save_data"  : true,
    "saved_data" : [ "text" ]
}

module.exports = config;