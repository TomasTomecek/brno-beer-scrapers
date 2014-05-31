var l=console.log;
var fb = require('./fb');
var removeDiacritics = require('diacritics').remove;

function extract(message) {
    var clean_msg = removeDiacritics(message);
    if (clean_msg.indexOf("na treti pipe") != -1) {
        return message;
    }
    return null;
}

fb.FBParser.init({
    callback: extract,
    process_news: true,
});

