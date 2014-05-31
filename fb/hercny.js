var l=console.log;
var fb = require('./fb');

function extract(message) {
    var lines = message.split('\n');
    var result = [];
    var at_beer_list = false;
    var past_beer_list = false;
    lines.forEach(function(item){
        beer = {name:'', ibu:'', epm:'', price:''}
        if (at_beer_list) {
            //price
            var price_match = item.match(/(\d+),-/);
            if (price_match != null) {
                beer['price'] = price_match[1];
            }

            //ibu
            var ibu_match = item.match(/(\d+)\s*IBU/);
            if (ibu_match != null) {
                beer['ibu'] = ibu_match[1];
            }
            
            //abv
            var abv_match = name.match(/(\d+)\s*°/);
            if (abv_match != null) {
                beer['abv'] = abv_match[1];
                beer['name'] = item.substring(abv_match.index);
            } else {
                name_match = item.match(/^([^,0-9])[,0-9]/);
                beer['name'] = name_match[1];
            }
            result.push(beer);
        }
        if(item.toLowerCase().indexOf('srdce') >= 0) {
            past_beer_list = true;
            at_beer_list = false;
        }
        if(item.toLowerCase().indexOf('ahoj,') >= 0 && ! past_beer_list) {
            at_beer_list = true;
        }
    });
    return result;
}

fb.FBParser.init({
    callback: extract,
    process_beers: true
});

