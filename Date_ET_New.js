exports.dateETformatted = function(){
    const monthNamesET = ["jaanuar", "veebruar", "märts", "aprill", "mai", "juuni", "juuli", "august", "september", "oktoober", "november", "detsember"];
    
    let timenow = new Date();
    return timenow.getDay() + " " + monthNamesET[timenow.getMonth()] + " " + timenow.getFullYear();
}