/*
{ id: '538580729567067_604731846285288',
  from:
   { category: 'Restaurant/cafe',
     category_list: [ [Object], [Object] ],
     name: 'U Proutníka',
     id: '538580729567067' },
  message: 'U PrOUTNÍKA vystřídal VALÁŠKA polotmavý speciál DÉMON 13° z Pivovaru Vysoký Chlumec!!! ;-)\n\nDÉMON:\n•pivní styl: polotmavý speciál\n•obsah alkoholu: 5,2 % obj.\n\nPivní speciál Démon byl připraven podle starých klášterních receptur mnichovské oblasti, jejichž tradice sahá až do roku 1420.\n Je charakteristický bohatým a vyváženým profilem chutí. Má příjemnou sladovou vůni a mírně nasládlou medovou chuť s jemnou hořkostí.\n\nNABÍDKA 13.3.2014 tudíž je:\n**************************\n\n•POUTNÍK “double”\n•POUTNÍK “špína”\n (Pivovar Pelhřimov)\n•DÉMON 13° polotmavý speciál\n (Pivovar Vysoký Chlumec)\n•CHOTĚBOŘ PREMIUM 12°\n (Pivovar Chotěboř)',
  picture: 'https://scontent-a.xx.fbcdn.net/hphotos-prn1/l/t1.0-0/1010338_604731802951959_1836865076_s.jpg',
  link: 'https://www.facebook.com/uproutnika/photos/pcb.604731846285288/604731802951959/?type=1&relevant_count=2',
  icon: 'https://fbstatic-a.akamaihd.net/rsrc.php/v2/yx/r/og8V99JVf8G.gif',
  privacy: { value: '' },
  type: 'photo',
  status_type: 'mobile_status_update',
  object_id: '604731802951959',
  application:
   { name: 'Facebook for Android',
     namespace: 'fbandroid',
     id: '350685531728' },
  created_time: '2014-03-13T13:40:32+0000',
  updated_time: '2014-03-13T13:40:32+0000',
  shares: { count: 1 } }
*/

var l=console.log;
var fb = require('./fb');


//String.prototype.capitalize = function(lower) {
//    return (lower ? this.toLowerCase() : this).replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
//};
//
//Array.prototype.update_blank = function(key, value) {
//    this.map(function(item) {
//        if (item.brewery === "") {
//            item[key] = value;
//        }
//    });
//}

function extract(message) {
    var lines = message.split('\n');
    var result = [];
    var at_beer_list = false;
    var past_beer_list = false;
    lines.forEach(function(item){
        beer = {name:'', brewery:''}
        if (at_beer_list) {
            item = item.replace(/^\s*/,'');
            // item.startswith '•'
            if (item.indexOf('•') == 0) {
                // beer name: put to lowercase and capitalize
		var name = item.substring(1).toLowerCase().replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
                var match = name.match(/\s*\d+\s*°/);
                if (match != null) {
                    beer['epm'] = match[0].replace(/^\s*/, '').replace(/°\s*$/, '');
                    name = name.substring(0, match.index);
                }
                beer['name'] = name.replace(/\s*$/, '');
                result.push(beer);
            } else if (item.indexOf('(') == 0) {
                var brewery = item.substring(item.indexOf('(') + 1, item.indexOf(')'));
                result.forEach(function(i) {
                    if (item.brewery === "") {
                        item['brewery'] = brewery;
                    }
                });
            }
        }
        if ((item.match(/^\s*$/) != null || item.match(/^[=—_\-*]+$/) != null) && result.length > 0 && at_beer_list){
            past_beer_list = true;
            at_beer_list = false;
        }
        if (item.match(/^[\s=—_\-*]+$/) != null && !past_beer_list && !at_beer_list){
            at_beer_list = true;
        }
    });
    return result;
}

fb.FBParser.init({
    callback: extract,
    process_beers: true
});
