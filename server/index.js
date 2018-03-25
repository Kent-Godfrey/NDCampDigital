const fs      = require('fs'),
      dotenv  = require('dotenv'),
      express = require('express'),
      socket  = require('socket.io'),
      Twitter = require('twitter');

const port = 3000;

const app = express();
const server = app.listen(port, () => console.log(`Server is listening on port ${port}.`));
const io = socket(server);

const twitter_stream = require('./twitter-stream/index.js');

app.use(express.static('server/public'));

io.on('connection', socket => {
    console.log(`Connected Socket: ${socket.id}`);
});

twitter_stream(io);