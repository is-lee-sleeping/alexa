const Alexa = require('alexa-sdk');
const https = require('https');

exports.handler = (event, context, callback) => {
  const alexa = Alexa.handler(event, context);
  const sleeping = "Yes, Lee is sleeping";
  const notSleeping = "No, Lee is not sleeping, somebody has to fix queequeg"
  const options = {
    host: 'api.isleesleeping.com',
    path: '/',
    port: 443,
  };

  const handlers = {
    'isSleeping': function () {
      const req = https.get(options, (res) => {
        res.on('data', (data) => {
          payload = JSON.parse(data.toString());

          this.emit(':tell', payload.leeIsSleeping ? sleeping : notSleeping);
        });
      });
    }
  };

  alexa.registerHandlers(handlers);
  alexa.execute();
};