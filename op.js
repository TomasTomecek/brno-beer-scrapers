var cheerio = require('cheerio');
var request = require('request');
var url = 'http://ochutnavkovapivnice.cz/prave_na_cepu/'

var l = console.log;

function scrape(html){
    var $ = cheerio.load(html);

    l('Parser started.');

    result = []

    $('table tr').each(function(tr_index, tr) {
        var tds = $(tr).find('td');
        var beer = {
            name: $(tds[0]).text(),
            type: $(tds[1]).text(),
            epm: $(tds[2]).text(),
            abv: $(tds[3]).text(),
            ipu: $(tds[4]).text(),
            brewery: $(tds[5]).text(),
            city: $(tds[6]).text(),
            country: $(tds[7]).text(),
        };
        result.push(beer);
    });

    l(result);
    l('Parser ended.');
}

var start = Date.now();

request({
    uri: url,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4'
    }
}, function (error, response, body) {
    var req_time = Date.now() - start;
    l('Request took ' + req_time + 'ms.');
    if (!error && response.statusCode == 200) {
        scrape(body);
    }
});