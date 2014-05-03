var cheerio = require('cheerio');
var request = require('request');
var url = 'http://www.vycepnastojaka.cz/menu/'

var l = console.log;

function scrape(html){
    var $ = cheerio.load(html);

    l('Parser started.');

    result = []

    var beers = $('.menu_list .category_list');
    var beer_cat = $(beers[0]);

    beer_cat.children('div.item').each(function() {
      var beer_elem = $(this);
      var beer = {
          name: beer_elem.children('span.name').text(),
          amount: beer_elem.children('span.amount').text(),
          price: beer_elem.children('span.price').text(),
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
