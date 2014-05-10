var request = require('request');
var l = console.log;

function post(stuff) {
    l(stuff);
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

module.exports = {
    post: post
};
