/*
 * Superclass for specific parsers:
 *  
 *  it downloads feed from FB
 */
var l = console.log;
var FB = require('fb');
var request = require("request");
var self = null;

var FBParser = {
    result: [],
    token: null,
    
    /*
     * must have items:
     *  path -- what we fetch
     *  callback -- function to process stuff, has to take one argument
     */
    settings: null,

    init: function(settings) {
        l("init %s", settings);
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

        this.token = res.access_token;

        FB.setAccessToken(this.token);

	self.fetch_feed();
    },

    /* path is a name of FB page to fetch
     * callback is function which process one post, NOT just a message
     */
    fetch_feed: function() {
        FB.api(self.settings.path, { fields: ['id', 'feed'] }, function (res) {
	    l("process FB response");
            if(!res || res.error) {
                l(!res ? 'error occurred' : res.error);
                return;
            }
            res.feed.data.map(function(item) {
                if (!(typeof item.message === 'undefined')) {
                    stuff = self.settings.callback(item.message);
		    self.result.push({
		        data: stuff,
			date: Date.parse(item.updated_time)
		    });
                };
            });
	    self.post(self.result);
        })
        
    },

    /*
     * send processed stuff to app
     */
    post: function (stuff) {
        request.post({
            uri: "http://127.0.0.1",
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4'
	    },
	    json: stuff
        }, function (error, response, body) {
	    return
            if (error || response.statusCode != 200) {
                l(response.statusCode);
		l(error);
            }
        });
    }
};

module.exports = {
    FBParser: FBParser
};

