const RtmClient  = require('@slack/client').RTMClient;
const WebClient  = require('@slack/client').WebClient;
const RTM_EVENTS = require('@slack/client').RTM_EVENTS;
const config = require("./config.js");
const googleCalendar = require("./googleCalendar.js")

const bot_token = config.token;
const rtm       = new RtmClient(bot_token);
const web       = new WebClient(bot_token);

rtm.on('message', function handleRtmMessage(message) {
    if (message.channel === config.slack.channel && message.text && message.text.startsWith("!calendar")) {
        googleCalendar.getList(function(resp){
            rtm.sendMessage(resp,message.channel)
        }); 
    }
});

rtm.start();