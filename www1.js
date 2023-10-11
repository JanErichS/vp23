const http = require("http"); //võtab kõik veebipäringuga seotud 
const url = require("url"); //oskab päringuid lugeda
const path = require("path"); // sisseehitatud -> defineerib failide asukohad
const fs = require("fs"); //file system -> sisseehitatud
const dateTime = require("./dateTime_ET.js"); //toob sisse aja ja kuupäeva mooduli
const { randomInt } = require("crypto");
const dateTimeEN = require("./dateTime_EN.js")
//const guestList = require("./visitors.js")

const queryString = require("querystring")

// veebilehe elemendid
const pageHead = '<!DOCTYPE html>\n<html>\n<head>\n\t<meta charset="utf-8">\n\t<title>Jan-Erich Sigur; Veebiprogrammeerimine 2023</title>\n</head>\n<body>\n';
const pageBanner = '\n\t<img src="banner.png" alt="Kursuse bänner">';
const pagebody = '\n\t<h1>Jan-Erich Sigur</h1>\n\t<p>See veebileht on valminud <a href="https://www.tlu.ee/" target="_blank">TLÜ</a> Digitehnoloogiate instituudi informaatika eriala õppetöö raames.</p>\n<hr>';
const pageFoot = '\n\t<hr>\n</body>\n</html>';

const pageTime = '\n\t<p>Lehekülg avati kell ' + dateTime.timeETformatted() + ' </p>';
const pageDate = '\n\t<p>Lehekülje avamise kuupäev on ' + dateTime.dateETformatted() +  '</p>';
const pageToD = '\n\t<p>Praegu on: ' + dateTime.timeOfDayET() + '</p>';

const backHome = '\n\t<p><a href="/">Vajuta siia, et saada tagasi kodulehele</a></p>\n<hr>';

// semester prgressbar algandmed
const today = new Date();
const semesterStart = new Date("08/28/2023");
const semesterEnd = new Date("01/28/2024");

const semOnGoing = "Semester käib praegult";
const semEnded  = "Semester on juba läbi!";
const semPending  = "Semester pole veel alanud!";

// kellaaeg formi täitmisel
let dateENForm = dateTimeEN.dateENformatted();
let timeENForm = dateTime.timeETformatted();

//Järgnev on banaalseim lahendus
http.createServer(function(req, res){ // loob veebiserveri lk
    let currentURL = url.parse(req.url, true);
    // formsi loogika
	if(req.method === 'POST'){
        collectRequestData(req, result => {
            console.log(result);
            //kirjutame andmeid tekstifaili
            fs.open('public/namelog.txt', 'a', (err, file)=>{ // avab faili; 'a' laseb juurde lisada
                if(err){
                    throw err;
                }
                else {
                    fs.appendFile('public/namelog.txt', result.firstNameInput + ';' + result.lastNameInput + ';' + timeENForm + ';' + dateENForm + ';', (err)=>{
                        if(err){
                            throw err;
                        }
                        else{
                            console.log('Faili on kirjutatud!')
                        }
                    });
                }
            });
			res.end(result.firstNameInput);
		});
    };

    if (currentURL.pathname === "/"){        // 3 === kas on täpselt samasugune (tüüp k.a)
        res.writeHead(200, {"Content-type": "text/html"}); //loob päise, 200-> edukas req; teksti ja html veebileht;
        res.write(pageHead);
        res.write(pageBanner);
        res.write(pagebody);
        res.write('\n\t<p><a href="addname">Lisa oma nimi</a>!</p>\n\t<hr>'); // \t -> "tab"
        res.write('\n\t<p><a href="semester">Vaata semestri kulgu</a>!</p>\n\t<hr>');
        res.write('\n\t<p><a  href="tlupilt">Üllatus</a></p><hr>');
        res.write('\n\t<p><a href="guests">Kes siin käinud on</a></p><hr>')
        res.write(pageTime);
        res.write(pageDate);
        res.write(pageToD);
        res.write(pageFoot);
        console.log("Keegi vaatab");
        //valmis, saada ära
        return res.end() // res.end() -> lõpetab kogu "vaste"
    }

    else if (currentURL.pathname === "/addname"){
        res.writeHead(200, {"Content-type": "text/html"});
        res.write(pageHead);
        res.write(pageBanner);
        res.write(pagebody);
        res.write('\n\t<hr>\n\t<h2>Palun, lisa oma nimi</h2>');
        res.write('\n\t	<form method="post">\n<label for="firstNameInput">Eesnimi: </label>\n<input type="text" name="firstNameInput" id="firstNameInput" placeholder="Sinu eesnimi...">\n<br>\n<br>\n<label for="lastNameInput">Perekonnanimi: </label>\n<input type="text" name="lastNameInput" id="lastNameInput" placeholder="Sinu perekonnanimi..."> \n\n<br>\n<br>\n<input type="submit" name="nameSubmit" id="nameSubmit" value="Salvesta">\n</form>');
        res.write(backHome);
        res.write(pageTime);
        res.write(pageDate);
        res.write(pageToD);
        res.write(pageFoot);
        return res.end() 
    }

    else if (currentURL.pathname === "/guests"){
        fs.readFile('public/namelog.txt', 'utf8', (err, guests)=>{
            if(err){
                throw err;
            }
            else{
                let guestList = guests.split(";");
                //console.log(guestList);
                let guestAmount = guestList.length;
                let listOut = '\n\t<ul>';
                for (let i = 0; i < guestAmount; i ++){
                    listOut += '\n\t\t<li>' + guestList[i] + '</li>';
                };
                listOut += '\n\t</ul>';
                //console.log(listOut)
                guestsList(res, listOut);
            }
        });
    }
    
    else if (currentURL.pathname === "/semester"){
        res.writeHead(200, {"Content-type": "text/html"});
        res.write(pageHead);
        res.write(pageBanner);
        if (semesterEnd.getTime() > today && today > semesterStart.getTime()){
            res.write('\n\t<p>' + semOnGoing + '</p>');
            let semesterTime = today.getTime() - semesterStart.getTime(); //annab semestri läbitud aja millisekundites 
            let semesterDaysNow = Math.floor(semesterTime / 1000 / 60 / 60 / 24);
            res.write('\n\t<p> Läbitud on juba ' + semesterDaysNow + ' päeva</p>');
            res.write('<p>Läbida on veel ' + (154 - semesterDaysNow) + ' päeva</p>') //semestris on 154 päeva
            res.write('<meter min="0" max="154" value="'+ semesterDaysNow + '"></meter>');
        }
     
        else if (semesterEnd < today.getTime()){
            res.write('\n\t<p>' + semEnded + '</p>');
        }
     
        else if (semesterStart > today.getTime()) {
            res.write('\n\t<p>' + semPending + '</p>');
        }
        res.write(backHome);
        res.write(pageFoot);
        return res.end()
    }

    else if (currentURL.pathname === "/tlupilt"){
        // loeme kataloogist fotode nimekirja ning loosime pildi.
        let htmlOutput = '\n\t<p>Pilti ei saa näidata :( (sadness)</p>';
        fs.readdir('public/tluphotos', (err, fileList)=>{
            if (err){
                throw err;
                tluPhotoPage(res, htmlOutput);
            }
            else {
                let photoNum = Math.floor(Math.random() * fileList.length); // irl peaks vaatama, kas kõik failid on päriselt pildifailid // jpg,png,gif ja svg failid on ainult lubatud veebis
                htmlOutput = '\n\t<img src="' + fileList[photoNum] + '" alt="TLÜ Pilt">';
                // nimekiri failidest
                listOutput = '\n\t<ul>';
                for (fileName of fileList){
                    listOutput += '\n\t<li>' + fileName + '</li>' ;
                }
                listOutput += '\n\t</ul>';

                tluPhotoPage(res, htmlOutput, listOutput);
            }
        });
    }

    else if (currentURL.pathname === "/banner.png"){
       // console.log("Tahame pilti!"); debug
        let bannerPath = path.join(__dirname, "public", "banner");
        // console.log(bannerPath + currentURL.pathname); debug
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

    else if (path.extname(currentURL.pathname) === ".jpg"){
        let tluPath = path.join(__dirname, "public", "tluphotos");
        fs.readFile(tluPath + currentURL.pathname, (err, data)=>{
            if (err){
                throw err;
            }
            else{
                res.writeHead(200, {"Content-type": "image/jpeg"});
                res.end(data);
            }
        });
    }
    else {
        res.end("ERROR 404");
    }
}).listen(5133)

function tluPhotoPage(res, htmlOutput, listOutput){ // siin võib res ja htmlOutput asemel olla ka mõni muu muutuja nimi, aga siis peaks olema funktsioonis endas ka teine nimetus.
    res.writeHead(200, {"Content-type": "text/html"});
    res.write(pageHead);
    res.write(pageBanner);
    res.write(pagebody);
    res.write(backHome);
    res.write('<h1>Pilt TLÜ-st</h1>')
    res.write(htmlOutput + '\n\t<hr>')
    res.write('\n\t<button onClick="window.location.reload();">Uus Pilt</button> \n<hr>')
    res.write(listOutput)
    //res.write('\n\t<img src="tlu_6.jpg" alt="Pilt TLÜ koridorist">');
    res.write(pageFoot);
    return res.end(); 
}

function guestsList(res, listOut){ // siin võib res ja htmlOutput asemel olla ka mõni muu muutuja nimi, aga siis peaks olema funktsioonis endas ka teine nimetus.
    res.writeHead(200, {"Content-type": "text/html"});
    res.write(pageHead);
    res.write(pageBanner);
    res.write(pagebody);
    res.write(backHome);
    res.write('<h1>Siin on käinud:</h1>')
    res.write(listOut)
    //res.write('\n\t<img src="tlu_6.jpg" alt="Pilt TLÜ koridorist">');
    res.write(pageFoot);
    return res.end(); 
}


function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    if(request.headers['content-type'] === FORM_URLENCODED) {
        let receivedData = '';
        request.on('data', chunk => {
            receivedData += chunk.toString();
        });
        request.on('end', () => {
            callback(queryString.decode(receivedData));
        });
    }
    else {
        callback(null);
    }
}
// rühm1 5100 port // Mul 5133 port

//Üleminie käivitab uue serveri greenys
// sulgudes esimene argument "callback"; req -> request (standard); res -> results/response (standard)