var l=console.log;
var fb = require('./fb');

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
    return result;
}

fb.FBParser.init({
    path: "/ualbertabrno",
    callback: extract
});
