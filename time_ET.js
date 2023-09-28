exports.timeETformatted = function(){

    let timeNow = new Date();

    let hourNow = timeNow.getHours();
    let minNow = timeNow.getMinutes();
    let secNow = timeNow.getSeconds();
    //muudab baasaja vastavalt tunniks, min ja sek

    let timeET = hourNow + ":" + minNow + ":" + secNow;
    return timeET;
}