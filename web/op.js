var cheerio = require('cheerio');
var request = require('request');
var web = require('./web');

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

web.init({
    callback: scrape,
});
