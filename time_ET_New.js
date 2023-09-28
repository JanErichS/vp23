exports.timeETformatted = function(){
    let timenow = new Date();
    return timenow.getHours() + ":" + timenow.getMinutes() + ":" + timenow.getSeconds
}