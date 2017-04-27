# Import the necessary methods from tweepy library
from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream

# Variables that contains the user credentials to access Twitter API
access_token = "1955200878-Z2OhzCiJjBJD8j8nTjxsKMO2NSq6Vqv6GORSOxV"
access_token_secret = "OJD3iKlUZEwvylFxxIqvvdNIdHhkPAL7rU1xbS2r44q0I"
consumer_key = "Ku4FtMvmOfjAmfEo0gQMa21cy"
consumer_secret = "1DlmUG1vdVtmaOBXE4dF6tC4XQNAuRn8HBq76FnfiMejHFbs0J"


# This is a basic listener that just prints received tweets to stdout.
class StdOutListener(StreamListener):

    def on_data(self, data):
        print(data)
        return True

    def on_error(self, status):
        print(status)


if __name__ == '__main__':

    # This handles Twitter authetification and the
    # connection to Twitter Streaming API
    l = StdOutListener()
    auth = OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_token_secret)
    stream = Stream(auth, l)

    # This line filter Twitter Streams to capture data by
    # the keywords: 'python', 'javascript', 'ruby'

    stream.filter(track=['campdigital'])
