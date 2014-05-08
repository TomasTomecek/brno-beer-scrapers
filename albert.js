var l=console.log;

var FB = require('fb');

var token;

FB.api('oauth/access_token', {
    client_id: process.env.APPID,
    client_secret: process.env.SECRET,
    grant_type: 'client_credentials'
}, function (res) {
    if(!res || res.error) {
        l(!res ? 'error occurred' : res.error);
        return;
    }

    token = res.access_token;
    l(token);

    FB.setAccessToken(token);

    FB.api('/ualbertabrno', { fields: ['id', 'feed'] }, function (res) {
        if(!res || res.error) {
            l(!res ? 'error occurred' : res.error);
            return;
        }
        l(res.id);
        l(res.feed.data);
        res.feed.data.map(function(item) {
	    if (!(typeof item.message === 'undefined')) {
                extract(item.message);
	    };
        });
    })
});

function find_property(str, regex){
    try {
        return str.match(regex)[1];
    } catch(err) {
        return "";
    }
}

function extract(message){
    var lines = message.split('\n');
    result = [];
    lines.map(function(item) {
        if (item.indexOf("*") == 0 || item.indexOf("-") == 0) {
	    beer = {
	        line: item.replace(/^[*-] /, ""),
	        epm: find_property(item, /(\d+)°/)
	    };
	    result.push(beer);
	}
    });
    l(result);
}

