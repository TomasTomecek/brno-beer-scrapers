var l = console.log;
var FB = require('fb');

var token;

FB.api('oauth/access_token', {
        client_id: process.env.APPID,
        client_secret: process.env.SECRET,
        grant_type: 'client_credentials'
}, function (res) {
        if(!res || res.error) {
                    console.log(!res ? 'error occurred' : res.error);
                            return;
                                }

            token = res.access_token;
            l(token);

            FB.setAccessToken(token);

            FB.api('/uproutnika', { fields: ['id', 'feed'] }, function (res) {
                  if(!res || res.error) {
                          console.log(!res ? 'error occurred' : res.error);
                              return;
                                }
                    console.log(res.id);
                    l(res.feed.data);
            })
});
