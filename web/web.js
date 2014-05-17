/*
 * general purpose module for scraping websites
 */
var request = require('request');
var l = console.log;
var scrape = require("../scrape");
var self = null;

WebParser = {
    result: [],

    /*
     * must have items:
     *  url -- what we fetch
     *  callback -- function to process stuff, has to take one argument
     */
    settings: null,

    init: function(settings) {
        l("init", settings);
        if (typeof process.env.BEER_UN === 'undefined' || typeof process.env.BEER_PW === 'undefined') {
            l("${BEER_UN} or ${BEER_PW} is not defined; can't send data to web");
            return;
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
        this.fetch();
    },

    fetch: function(){
        request({
            uri: self.target_url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4'
            }
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                stuff = self.settings.callback(body);
                scrape.submit(stuff, self.post_url);
            }
        });
    }
}

module.exports = WebParser;
