# Import code from the Twython module
from twython import TwythonStreamer

# Set API keys and Authorisation Keys
APP_KEY = 'kixqDAGpTOlm47RwkMkmEAHH1'
APP_SECRET = 'DFg6KWgTKsA28SKolpKGtq8rkbfJO3p0iZ8i8Gao8CQ0k269Ti'
OAUTH_TOKEN = '1955200878-2UrPIyhPrRHi54iXJWvvZ02zPbxTmBgKJbAWxIl'
OAUTH_TOKEN_SECRET = 'RrDTkkcV3uIFFu7PEc5pndeXKAqoo9o7QDT77W7BgUfKW'


class MyStreamer(TwythonStreamer):

    # On success print text from the data, text is the body of the tweet which will contain the keyword
    def on_success(self, data):
        if 'text' in data:
            print(data['text'].encode('utf-8'))

    # On error print the error code and disconnect the streamer
    def on_error(self, status_code, data):
        print(status_code)

        self.disconnect()

# Pipe API information into the streamer
stream = MyStreamer(APP_KEY, APP_SECRET,
                    OAUTH_TOKEN, OAUTH_TOKEN_SECRET)

# Track keywords seperated by commas and look for the most recent tweets (other arg is popular)
stream.statuses.filter(
    track='@WeAreSigma, #CampDigital, "Camp Digital", #NorthernDabblers',
    result_type='recent')
