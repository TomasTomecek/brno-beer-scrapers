/*
 * Superclass for specific parsers:
 *
 *  it downloads feed from FB
 */
var l = console.log;
var FB = require('fb');
var request = require("request");
var scrape = require("../scrape");
var self = null;

var FBParser = {
    result: [],
    token: null,

    /*
     * must have items:
     *  callback -- function for processing beers -- makes sense only for 'process_beers'
     *  process_beers or process_news
     */
    settings: null,

    init: function(settings) {
        l("init", settings);
        if (typeof process.env.APPID === 'undefined' || typeof process.env.SECRET === 'undefined') {
            l("${APPID} or ${SECRET} is not defined; can't connect to FB");
            return;
        }
        if (typeof process.env.BEER_UN === 'undefined' || typeof process.env.BEER_PW === 'undefined') {
            l("${BEER_UN} or ${BEER_PW} is not defined; can't send data to web");
            return;
        }
        this.debug = false;
        if (typeof process.argv[2] === 'undefined' && process.argv[2].indexOf('debug') != -1) {
            this.debug = true;
        }
        if (typeof process.argv[2] === 'undefined') {
            l("POST REST URL is not specified!");
            return;
        }
        if (typeof process.argv[3] === 'undefined') {
            l("Target URL is not specified!");
            return;
        }
        this.post_url = process.argv[2];
        this.target_url = process.argv[3];
        this.settings = settings;
        self = this;
        this.open_connection();
    },

    /*
     * start the chain of fetching the feed
     */
    open_connection: function() {
        l('open FB connection');
        FB.api(
            'oauth/access_token', {
                client_id: process.env.APPID,
                client_secret: process.env.SECRET,
                grant_type: 'client_credentials'
            },
            this.set_token
        );
    },

    /*
     * Set access token and then call function to process stuff
     */
    set_token: function(res) {
        l('process token');
        if(!res || res.error) {
            l(!res ? 'error occurred' : res.error);
            return;
        }
        self.token = res.access_token;
        FB.setAccessToken(self.token);
        if (self.settings.process_beers) {
            self.fetch_feed();
        } else if (self.settings.process_news) {
            self.submit_news();
        }
    },

    /* path is a name of FB page to fetch
     * callback is function which process one post, NOT just a message
     */
    fetch_feed: function() {
        FB.api(self.target_url, { fields: ['id', 'feed'] }, function (res) {
            l("process FB response");
            if(!res || res.error) {
                l(!res ? 'error occurred' : res.error);
                return;
            }
            for(var i = 0; i<res.feed.data.length; i++) {
                item = res.feed.data[i];
                if (!(typeof item.message === 'undefined')) {
                    stuff = self.settings.callback(item.message);
                    if (stuff.length > 0) {
                        if (self.debug) {
                            l(stuff);
                        } else {
                            scrape.submit(stuff, self.post_url);
                            return;
                        }
                    }
                }
            }
        });
    },

    submit_news: function() {
        var now = Date.now();
        FB.api(self.target_url, { fields: ['id', 'feed'] }, function (res) {
            l("FB request took", Date.now() - now, "ms");
            if(!res || res.error) {
                l(!res ? 'error occurred' : res.error);
                return;
            }
            var count = 5;  // amount of news items to process
            var news = []
            for(var i = 0; i<res.feed.data.length; i++) {
                item = res.feed.data[i];
                if (!(typeof item.message === 'undefined')) {
                    var msg = item.message;
                    if (typeof self.settings.callback !== 'undefined') {
                        msg = self.settings.callback(msg);
                        if (msg == null) {
                            continue;
                        }
                    }
                    news.push({
                        id: item.id,
                        message: msg,
                        updated_time: new Date(item.updated_time),
                    });
                    if (count == 0) {
                        break;
                    } else {
                        count--;
                    }
                }
            }
            scrape.submit(news, self.post_url);
        });
    }
};

module.exports = {
    FBParser: FBParser
};

