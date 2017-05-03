# Import code from the Twython module
from twython import TwythonStreamer

# Set API keys and Authorisation Keys
APP_KEY = 'kixqDAGpTOlm47RwkMkmEAHH1'
APP_SECRET = 'DFg6KWgTKsA28SKolpKGtq8rkbfJO3p0iZ8i8Gao8CQ0k269Ti'
OAUTH_TOKEN = '1955200878-2UrPIyhPrRHi54iXJWvvZ02zPbxTmBgKJbAWxIl'
OAUTH_TOKEN_SECRET = 'RrDTkkcV3uIFFu7PEc5pndeXKAqoo9o7QDT77W7BgUfKW'


class MyStreamer(TwythonStreamer):

    """
    Checks connection and prints the returned data or error code.

    Extends:
        TwythonStreamer

    Variables:
        APP_KEY {str} -- API Key
        APP_SECRET {str} -- API Key Secret
        OAUTH_TOKEN {str} -- OAuth Token
        OAUTH_TOKEN_SECRET {str} -- OAuth Token Secret
        track {str} -- Sets the keywords to track, seperated by commas
        result_type {str} -- Sets the type of results, popular or recent
    """

    def on_success(self, data):
        if 'screen_name' in data:
            print(data['screen_name'].encode('utf-8'))
        if 'text' in data:
            print(data['text'].encode('utf-8'))

    def on_error(self, status_code, data):
        print(status_code)

        self.disconnect()


stream = MyStreamer(APP_KEY, APP_SECRET,
                    OAUTH_TOKEN, OAUTH_TOKEN_SECRET)

stream.statuses.filter(
    track='#WednesdayWisdom, #LineofDuty',
    result_type='recent')
