const firstName = "Jan-Erich";
const lastName = "Sigur";
const dateValue = require("./date_ET");
console.log("Programmi autor on: " + firstName + " " + lastName);

let dateETNow = dateValue.dateETformatted();

console.log("Täna on: " + dateETNow);
console.log("Täna on tõesti: " + dateValue.dateETformatted());