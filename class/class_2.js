const firstName = "Jan-Erich";
const lastName = "Sigur";

console.log("Programmi autor on: " + firstName + " " + lastName);

function dateETformatted(){

    const monthNamesET = ["jaanuar", "veebruar", "märts", "aprill", "mai", "juuni", "juuli", "august", "september", "oktoober", "november", "detsember"];
    //console.log(monthNamesET[1]);

    let timeNow = new Date();
    //console.log(timeNow);
    let dateNow = timeNow.getDate();
    let monthNow = timeNow.getMonth();
    let yearNow = timeNow.getFullYear();
    //let dateET = dateNow + "." + monthNow + "." + yearNow;

    let dateET = dateNow + ". " + monthNamesET[monthNow] + " " + yearNow;
    return dateET;
}

let dateETNow = dateETformatted();

console.log("Täna on: " + dateETNow);
console.log("Täna on tõesti: " + dateETformatted());