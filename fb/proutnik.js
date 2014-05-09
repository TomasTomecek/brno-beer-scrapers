var l=console.log;

String.prototype.capitalize = function(lower) {
    return (lower ? this.toLowerCase() : this).replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

Array.prototype.update_blank = function(key, value) {
    this.map(function(item) {
        if (item.brewery === "") {
            item[key] = value;
        }
    });
}

var messages = [
    'Dnes 29.4.2014 U PrOUTNÍKA:\n————————————\n\n•POUTNÍK "double"\n•POUTNÍK "špína"\n (Pivovar Pelhřimov)\n•CORNEL RED ALE 12°\n (Podklášterní pivovar Třebíč)\n•ZÁMECKÁ DVANÁCTKA\n (Zámecký pivovar Bratčice)',
    'Dnes 22.4.2014 U PrOUTNÍKA:\n————————————\n\n•POUTNÍK "double"\n•POUTNÍK "špína"\n (Pivovar Pelhřimov)\n•CHOTĚBOŘ PREMIUM 12°\n (Pivovar Chotěboř)\n•ZÁMECKÁ ČERNÁ DVANÁCTKA\n (Zámecký pivovar Bratčice)\n\n>Následovat bude PRIMÁTOR\n WEIZENBIER z Náchodského\n pivovaru!!!',
    'Dnes 21.4.2014 U PrOUTNÍKA:\n————————————\n\n          !!!ZAVŘENO!!!\n\nPřejeme Veselé velikonoce a od zítra se na Vás budeme opět těšit!!! ;-)',
    'Dnes 18.4.2014 U PrOUTNÍKA:\n***************************\n\n•POUTNÍK "double"\n•POUTNÍK "špína"\n (Pivovar Pelhřimov)\n•CHOTĚBOŘ PREMIUM 12°\n (Pivovar Chotěboř)\n•ZÁMECKÁ ČERNÁ DVANÁCTKA\n (Zámecký pivovar Bratčice)\n\n \n☆ZÁMECKÁ ČERNÁ DVANÁCTKA☆\n—————————————\nTmavý nefiltrovaný a nepasterizovaný ležák\n\nČernou dvanáctku vaří Bratčický pivovar pouze při zvláštních příležitostech. O to více je také vzácnější! Nenechte si ujít jeho chuť! Můžete jej ochutnat např. na Velikonoce či na speciálních akcích, jako Pivní slavnosti atp.',
    'Dnes 17.4.2014 U PrOUTNÍKA:\n**************************\n\n•POUTNÍK "double"\n•POUTNÍK "špína"\n (Pivovar Pelhřimov)\n•CHOTĚBOŘ PREMIUM 12°\n (Pivovar Chotěboř)\n•ZELENÝ PEGAS 12° \n (Brněnský domácí pivovar Pegas)\n\n    !!!!OTEVŘENO OD 13:00!!!!',
    'Dnes 16.4.2014 U PrOUTNÍKA:\n***************************\n\n•POUTNÍK "double"\n•POUTNÍK "špína"\n (Pivovar Pelhřimov)\n•VALÁŠEK APA\n (Minipivovar Valášek ve Vsetíně)\n•CHOTĚBOŘ PREMIUM 12°\n (Pivovar Chotěboř)',
    'Ve čtvrtek 17.4.2014 přijďte na ZELENÉ PIVO z 1.moravského domácího pivovaru PEGAS!!! Otevřeno bude už od 13:00 hodin!',
    'Dnes 14.4.2014 U PrOUTNÍKA:\n***************************\n\n•POUTNÍK "double"\n•POUTNÍK "špína"\n (Pivovar Pelhřimov)\n•BESKYDSKÝ LEŽÁK\n (Beskydský pivovárek Ostravice)\n•HARRACH SVĚTLÝ LEŽÁK\n (Pivovar Velké Meziříčí)',
    'Dnes 11.4.2014 U PrOUTNÍKA:\n***************************\n\n•POUTNÍK "double"\n•POUTNÍK "špína"\n (Pivovar Pelhřimov)\n•KOUTSKÁ DESÍTKA\n (Pivovar Kout na Šumavě)\n•BESKYDSKÝ LEŽÁK\n (Beskydský Pivovárek Ostravice)\n\n•Následovat bude HARRACH světlý\n ležák z Velkého Meziříčí!!! :-)',
    'Dnes 10.4.2014 U PrOUTNÍKA:\n***************************\n\n•POUTNÍK "double"\n•POUTNÍK "špína"\n (Pivovar Pelhřimov)\n•KOUTSKÁ DESÍTKA\n (Pivovar Kout na Šumavě)\n•VÍSECKÁ PŠENKA\n (Vesnický Pivovar Ohrada)',
    'Dnes 7.4.2014 U PrOUTNÍKA:\n**************************\n\n•POUTNÍK "double"\n•POUTNÍK "špína"\n (Pivovar Pelhřimov)\n•VÍSECKÁ PŠENKA 13°\n (Vesnický Pivovar Ohrada)\n•VALÁŠEK IPA SAISON 16°\n (Minipivovar Valášek ve Vsetíně)',
    'Dnes 4.4.2014 U PrOUTNÍKA:\n**************************\n\n•POUTNÍK "double"\n•POUTNÍK "špína"\n (Pivovar Pelhřimov)\n•VALÁŠEK IPA SAISON 16°\n (Minipivovar Valášek ve Vsetíně)\n•KOUTSKÁ DVANÁCTKA\n (Pivovar Kout na Šumavě)',
    'Dnes 1.4.2014 U PrOUTNÍKA:\n**************************\n\n•POUTNÍK "double"\n•POUTNÍK "špína"\n (Pivovar Pelhřimov)\n•KOUTSKÁ DVANÁCTKA\n (Pivovar Kout na Šumavě)\n•VALÁŠEK ŽITNÁ IPA 14°\n (Minipivovar Valášek ve Vsetíně)',
    'Dnes 31.3.2014 U PrOUTNÍKA:\n***************************\n\n•POUTNÍK "double"\n•POUTNÍK "špína"\n (Pivovar Pelhřimov)\n•VALÁŠEK IPA 15°\n (Minipivovar Valášek ve Vsetíně)\n•KOUTSKÁ DVANÁCTKA\n (Pivovar Kout na Šumavě)',
    'Dnes 27.3.2014 U PrOUTNÍKA:\n **********************\n •POUTNÍK "double"\n •POUTNÍK "špína"\n  (Pivovar Pelhřimov)\n •VALÁŠEK IPA 15°\n  (Pivovar Valášek ve Vsetíně)\n •JAVOŘICKÝ SVĚTLÝ LEŽÁK\n  (Pivovar Kozlíček Horní Dubenky)',
    'Dnes 25.3.2014 U PrOUTNÍKA:\n***************************\n\n•POUTNÍK “double”\n•POUTNÍK “špína”\n (Pivovar Pelhřimov)\n•JAVOŘICKÝ SVĚTLÝ LEŽÁK\n (Pivovar Kozlíček Horní Dubenky)\n•PRIMÁTOR WEIZENBIER\n (Pivovar Náchod)',
    'Dnes 24.3.2014 U PrOUTNÍKA\n**************************\n\n•POUTNÍK “double”\n•POUTNÍK “špína”\n (Pivovar Pelhřimov)\n•ZÁMECKÁ DVANÁCTKA\n (Pivovar Bratčice)\n•VALÁŠEK IPA 15°\n (Minipivovar Valášek ve Vsetíně)',
    'Dnes 20.3.2014 U PrOUTNÍKA:\n**************************\n\n•POUTNÍK “double”\n•POUTNÍK “špína”\n (Pivovar Pelhřimov)\n•ZÁMECKÁ DVANÁCTKA\n (Pivovar Bratčice)\n•VÁLAŠEK IPA 15°\n (Minipivovar Valášek ve Vsetíně)',
    'Dnes 17.3.2014 U PrOUTNÍKA:\n***************************\n\n•POUTNÍK “double”\n•POUTNÍK “špína”\n (Pivovar Pelhřimov)\n•ZÁMECKÁ DVANÁCTKA\n (Pivovar Bratčice)\n•DÉMON 13° polotmavý speciál\n (Pivovar Vysoký Chlumec)\n\n>Až se vypije Démon bude následovat PRIMÁTOR\nWEIZENBIER z Náchodského\npivovaru! Na tento týden připravujeme také JAVOŘICKÝ LEŽÁK z pivovaru KOZLÍČEK Horní Dubenky o jehož nasazení na čepu Vás budeme včas informovat!!! ;-)',
    'U PrOUTNÍKA vystřídal VALÁŠKA polotmavý speciál DÉMON 13° z Pivovaru Vysoký Chlumec!!! ;-)\n\nDÉMON:\n•pivní styl: polotmavý speciál\n•obsah alkoholu: 5,2 % obj.\n\nPivní speciál Démon byl připraven podle starých klášterních receptur mnichovské oblasti, jejichž tradice sahá až do roku 1420.\n Je charakteristický bohatým a vyváženým profilem chutí. Má příjemnou sladovou vůni a mírně nasládlou medovou chuť s jemnou hořkostí.\n\nNABÍDKA 13.3.2014 tudíž je:\n**************************\n\n•POUTNÍK “double”\n•POUTNÍK “špína”\n (Pivovar Pelhřimov)\n•DÉMON 13° polotmavý speciál\n (Pivovar Vysoký Chlumec)\n•CHOTĚBOŘ PREMIUM 12°\n (Pivovar Chotěboř)',
    'Dnes 12.3.2014 U PrOUTNÍKA:\n**************************\n\n•POUTNÍK “double”             \n•POUTNÍK “špína”               \n (Pivovar Pelhřimov)\n•CHOTĚBOŘ premium 12°    \n (Pivovar Chotěboř)\n•VALÁŠEK IPA 15°               \n (Minipivovar Valášek ve Vsetíně)',
    'Dnes U PrOUTNÍKA :\n******************\n•POUTNÍK “double”\n•POUTNÍK “špína”\n•VALÁŠEK IPA 15°\n (Minipivovar Valášek ve Vsetíně)\n•KOUTSKÁ DVANÁCTKA\n (Pivovar Kout na Šumavě)',
    'Dneska U PrOUTNÍKA čepujeme POUTNÍKY double a špína, PRIMÁTOR STOUT z Náchodského pivovaru a ZÁMECKOU TŘINÁCTKU z Bratčic! Následovat bude velice oblíbená IPA z pivovaru VALÁŠEK ve Vsetíně! ;-)'
]

function extract(message){
    var lines = message.split('\n');
    var result = [];
    var at_beer_list = false;
    var past_beer_list = false;
    lines.map(function(item){
        l("'%s'", item);
        beer = {name:'', brewery:''}
        if (at_beer_list) {
            item = item.replace(/^\s*/,'');
            // item.startswith '•'
            if (item.indexOf('•') == 0) {
                var name = item.substring(1).capitalize(true);
                var match = name.match(/\s*\d+\s*°/);
                if (match != null) {
                    beer['degree'] = match[0].replace(/^\s*/, '').replace(/°\s*$/, '');
                    name = name.substring(0, match.index);
                }
                beer['name'] = name.replace(/\s*$/, '');
                result.push(beer);
            } else if (item.indexOf('(') == 0) {
                var brewery = item.substring(item.indexOf('(') + 1, item.indexOf(')'));
                result.update_blank('brewery', brewery);
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
    console.log(result);
    l('\n\n');
}
messages.map(function(message){
    extract(message);
});
