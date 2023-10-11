const dateENformatted = function(){
    
    let timeNow = new Date();
    return (timeNow.getMonth() + 1)+ "/" + timeNow.getDate() + "/" + timeNow.getFullYear();
}

module.exports = {dateENformatted: dateENformatted};
