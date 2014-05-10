var cheerio = require('cheerio');
var request = require('request');
var web = require('./web');
var url = 'http://ochutnavkovapivnice.cz/prave_na_cepu/'

var l = console.log;

function scrape(html){
    var $ = cheerio.load(html);

    result = []

    $('table tr').each(function(tr_index, tr) {
        if (tr_index > 0) {
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
        }
    });
    return result;
}

request({
    uri: url,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4'
    }
}, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        data = scrape(body);
        web.post(data);
    }
});
