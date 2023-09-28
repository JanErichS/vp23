exports.dateETformatted = function(){

    const monthNamesET = ["jaanuar", "veebruar", "märts", "aprill", "mai", "juuni", "juuli", "august", "september", "oktoober", "november", "detsember"];

    let timeNow = new Date();
    let dateNow = timeNow.getDate();
    let monthNow = timeNow.getMonth();
    let yearNow = timeNow.getFullYear();

    let dateET = dateNow + ". " + monthNamesET[monthNow] + " " + yearNow;
    return dateET;
}