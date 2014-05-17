/*
 * common functions for scrapers, FB and web
 */

var l = console.log;
var request = require('request');
var util = require('util');

// TODO: do here: if devel elif production
// DO NOT ENCLOSE WITH /
var url_base = "http://localhost:3000"

/*
 * send processed stuff to app
 */
scrape_utils = {
    submit: function(stuff, url) {
        l("send stuff to", url);
        request.post({
            uri: url,
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
        }).auth('test', 'test', false);
    },
};

module.exports = scrape_utils;
