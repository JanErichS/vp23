const http = require("http"); //võtab kõik veebipäringuga seotud 
const url = require("url"); //oskab päringuid lugeda
const path = require("path"); // sisseehitatud -> defineerib failide asukohad
const fs = require("fs"); //file system -> sisseehitatud
const dateTime = require("./dateTime_ET.js"); //toob sisse aja ja kuupäeva mooduli

const pageHead = '<!DOCTYPE html>\n<html>\n<head>\n\t<meta charset="utf-8">\n\t<title>Jan-Erich Sigur; Veebiprogrammeerimine 2023</title>\n</head>\n<body>\n'
const pageBanner = '\n\t<img src="banner.png" alt="Kursuse bänner">'
const pagebody = '\n\t<h1>Jan-Erich Sigur</h1>\n\t<p>See veebileht on valminud <a href="https://www.tlu.ee/" target="_blank">TLÜ</a> Digitehnoloogiate instituudi informaatika eriala õppetöö raames.</p>\n<hr>'
const pageFoot = '\n\t<hr>\n</body>\n</html>'

const pageTime = '\n\t<p>Lehekülg avati kell ' + dateTime.timeETformatted() + ' </p>'
const pageDate = '\n\t<p>Tänane kuupäev on ' + dateTime.dateETformatted() +  '</p>'
const pageToD = '\n\t<p>Praegu on: ' + dateTime.timeOfDayET() + '</p>'

//Järgnev on banaalseim lahendus
http.createServer(function(req, res){
    let currentURL = url.parse(req.url, true);
    //console.log(currentURL);
    if(currentURL.pathname === "/"){        // 3 === kas on täpselt samasugune (tüüp k.a)
        res.writeHead(200, {"Content-type": "text/html"}); //loob päise, 200-> edukas req; teksti ja html veebileht;
        res.write(pageHead);
        res.write(pageBanner);
        res.write(pagebody);
        res.write('\n\t<p><a href="addname">Lisa oma nimi</a>!</p>\n\t<hr>'); // \t -> "tab"
        res.write(pageTime);
        res.write(pageDate);
        res.write(pageToD);
        res.write(pageFoot);
        //console.log("Keegi vaatab")
        //valmis, saada ära
        return res.end() // res.end() -> lõpetab kogu "vaste"
    }
    else if (currentURL.pathname === "/addname"){
        res.writeHead(200, {"Content-type": "text/html"});
        res.write(pageHead);
        res.write(pageBanner);
        res.write(pagebody);
        res.write('\n\t<hr>\n\t<h2>Palun, lisa oma nimi</h2>');
        res.write('\n\t<p>Edaspidi lisame siia asju</p>');
        res.write(pageTime);
        res.write(pageDate);
        res.write(pageToD);
        res.write(pageFoot);
        return res.end() 
    }
    else if (currentURL.pathname === "/banner.png"){
        console.log("Tahame pilti!");
        let bannerPath = path.join(__dirname, "public", "banner");
        console.log(bannerPath + currentURL.pathname);
        fs.readFile(bannerPath + currentURL.pathname, (err, data)=>{
            if (err) {
                throw err; //saada veateade välja
            } 
            else {
                //console.log("uus-puus") --> bug fix
                res.writeHead(200, {"Content-type": "image/png"}); // loob uue arusaama, kus saab nüüd lisada pilte
                res.end(data);
            }
        });
        //seob public ja banner kataloogi veebilehega / õpetab veebilehe kasutama banner kataloogi
        //__dirname -> tähistab iseend / failiteed
    }
    else {
        res.end("ERROR 404");
    }
}).listen(5133)


// rühm1 5100 port

//Üleminie käivitab uue serveri greenys
// sulgudes esimene argument "callback"; req -> request (standard); res -> results/response (standard)