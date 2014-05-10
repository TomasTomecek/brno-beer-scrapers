var cheerio = require('cheerio');
var request = require('request');
var web = require('./web');
var url = 'http://www.vycepnastojaka.cz/menu/'

var l = console.log;

function find_in_array(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return array[i][key];
        }
    }
    return null;
}

function scrape(html){
    var $ = cheerio.load(html);

    result = []

    var beers = $('.menu_list .category_list');
    var beer_cat = $(beers[0]);

    beer_cat.children('div.item').each(function() {
      var beer_elem = $(this);
      var beer = {
          name: beer_elem.children('span.name').text().toLowerCase().replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); }).replace(/^\d*\s*/, ""),
          amount: beer_elem.children('span.amount').text(),
          price: beer_elem.children('span.price').text(),
      };
      if (find_in_array(result, 'name', beer.name) == null) {
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
