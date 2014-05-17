var l=console.log;
var fb = require('./fb');

if (typeof process.argv[2] === 'undefined') {
    l("FB URL name is not specified!");
    return;
}

fb.FBParser.init({
    path: process.argv[3],
    process_news: true
});

