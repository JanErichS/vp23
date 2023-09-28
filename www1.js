const http = require("http"); //võtab kõik veebipäringuga seotud 
const dateTime = require("./dateTime_ET.js"); //toob sisse aja ja kuupäeva mooduli


//Järgnev on banaalseim lahendus
http.createServer(function(req, res){
    res.writeHead(200, {"Content-type": "text/html"}); //loob päise, 200-> edukas req; teksti ja html veebileht;
    res.write('<!DOCTYPE html><html><head><meta charset="utf-8"><title>Jan-Erich Sigur; Veebiprogrammeerimine 2023</title></head><body>');
    res.write('<h1>Jan-Erich Sigur</h1><p>See veebileht on valminud <a href="https://www.tlu.ee/" target="_blank">TLÜ</a> Digitehnoloogiate instituudi informaatika eriala õppetöö raames.</p><hr></hr>')
    res.write('<hr></body></html>')
    res.write('<p>lehekülg avati kell ' + dateTime.timeETformatted() + ' </p>')
    res.write('<p>Tänane kuupäev on ' + dateTime.dateETformatted() +  '</p>')
    res.write('<p>Praegu on: ' + dateTime.timeOfDayET() + '</p>')
    console.log("Keegi vaatab")
    //valmis, saada ära
    return res.end(); // lõpetab "töö"
}).listen(1533)

// rühm1 1500 port

//Üleminie käivitab uue serveri greenys
// sulgudes esimene argument "callback"; req -> request (standard); res -> results/response (standard)