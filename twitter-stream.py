from twython import TwythonStreamer

APP_KEY = 'kixqDAGpTOlm47RwkMkmEAHH1'
APP_SECRET = 'DFg6KWgTKsA28SKolpKGtq8rkbfJO3p0iZ8i8Gao8CQ0k269Ti'
OAUTH_TOKEN = '1955200878-2UrPIyhPrRHi54iXJWvvZ02zPbxTmBgKJbAWxIl'
OAUTH_TOKEN_SECRET = 'RrDTkkcV3uIFFu7PEc5pndeXKAqoo9o7QDT77W7BgUfKW'


class MyStreamer(TwythonStreamer):
    def on_success(self, data):
        if 'text' in data:
            print(data['text'].encode('utf-8'))

    def on_error(self, status_code, data):
        print(status_code)

        self.disconnect()


stream = MyStreamer(APP_KEY, APP_SECRET,
                    OAUTH_TOKEN, OAUTH_TOKEN_SECRET)
stream.statuses.filter(
    track='test1431',
    result_type='recent')
