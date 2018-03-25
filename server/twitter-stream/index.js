const fs      = require('fs'),
      config  = require('./config'),
      dotenv  = require('dotenv').config(),
      Twitter = require('twitter');

const stream = io => {

    /**
     * Create a data variable.
     * Check to see if output file exists.
     * If it does, read the file.
     */
    const output = `${__dirname}/output/${config.output}`;
    let data;
    if (fs.existsSync(output)) {
        data = fs.readFileSync(output);
    }

    /**
     * Try to parse the data variable.
     * If it cannot be parsed, create a new array.
     */
    let tweets;
    try {
        tweets = JSON.parse(data);
    } catch (err) {
        if (err) tweets = [];
    }

    /**
     * Initialise the Twitter client with the API keys
     */
    const client = new Twitter(config.keys);

    /**
     * Launch stream and handle data
     */
    const stream = client.stream('statuses/filter', config.params, stream => {

        /**
         * When the stream receives a "data" event, it has discovered a new tweet.
         * Push the tweet to the tweets array.
         * If the arrays length is greater than or equal to 100,
         * get rid of all but the last item.
         * Then write tweet to the file defined in the config.
         */
        stream.on('data', event => {

            /**
             * Create an object from the data received in the event.
             * Edit this to filter the data you wish the receive.
             */
            const tweet = event;

            tweets.push(tweet);
            if (tweets.length > config.max_tweets) {
                tweets = tweets.slice(tweets.length - 1);
            }
            /**
             * JSON.stringify converts the variable in the first argument to a string,
             * and the third argument defines the number of spaces to use as indentation.
             * This allows the array to be easily readable, or "pretty-printed".
             * The callback function just throws any errors.
             */
            fs.writeFile(output, JSON.stringify(tweets, null, 4), err => {
                if (err) throw err;
            });
            console.log(`There are ${tweets.length} tweets in ${config.output}.\n`);

            io.emit('tweet', tweet);
        });
        
        /**
         * If the stream receives an "error" event, throw the error
         */
        stream.on('error', err => {
            throw err;
        });
        
    });
}

module.exports = stream;