const firstName = "Jan-Erich";
const lastName = "Sigur";
const dateTimeValue = require("../dateTime_ET");
const fs = require("fs");
//let folkWisdom = ""; //tühi "" on tühi väärtus -> muudab globaasleks muutujaks, sest on funktsioonidest väljaspool.

fs.readFile("../txtfiles/vanasona.txt", "utf8", (err, data)=>{ //utf8 on est klava; 
    if(err){
        console.log(err);
    }
    else{
       // folkWisdom = data;
        onScreen(data);
    }
});//readFile lõppeb

const onScreen = function(folkWisdom){ //paneb järjekorra väga banaaslelt paika -> nimi, kp, vanasõna jne.; (folkwisdom) -> "püüab" kinni eelmise funktsiooni andmed, eelmine funktsioon kaotas oma nime ning saatis lic kogu kupatuse välja.
    console.log("Programmi autor on: " + firstName + " " + lastName);
    console.log("Täna on: " + dateTimeValue.dateETformatted());
    //console.log(folkWisdom);
    let folkWisdoms = folkWisdom.split(";");//split("siia tuleb see, mis tükeldab teksti failis; prglt ";")
    //console.log(folkWisdoms)
    //console.log(folkWisdoms.length); //annab masiivi pikkuse (mitu elementi sees)
    //console.log("Tänane tarkus: " + folkWisdoms[Math.floor(Math.random() * folkWisdoms.lenght)]) ;
    //random moodulit ei pea require käsuga sisse importima ; kuulub Math moodulisse ; tavaline random annab 0-1 vahemikus ; Math.floor ümardab allapoole
    //kõige tavalisem for tsükkel (loop)
    for (let i = 0; i < folkWisdoms.length; i ++){
        console.log("Vanasõna nr " + (i + 1) + ': "' + folkWisdoms[i] + '"');
    }
     // i -> indeks, kõige tavalisem; defineerib muutuja, defineerib tsükkli pikkuse, defineerib reegli (prglt igakord i suuremaks); i ++ -> i = i + 1 (ning i +=5)
    
    console.log("Kell on: " + dateTimeValue.timeETformatted());
    console.log("praegu on: " + dateTimeValue.timeOfDayET() + ".");
    //console.log(dateTimeValue.monthsET);
}

