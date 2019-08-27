// Is not needed to be async, but better do it to mantain all the functions the same structure
async function isTimeInRange(startAt, endAt) {

    let startHour = startAt.split(":")[0];
    let startMinute = startAt.split(":")[1];
    let endHour = parseInt(endAt.split(":")[0]);
    let endMinute = parseInt(endAt.split(":")[1]);


    let currentDay = new Date();
    currentDay.setHours(0);
    currentDay.setMinutes(0);
    currentDay.setSeconds(0);
    currentDay.setMilliseconds(0);
    
    let todayStartingTime = currentDay;
    todayStartingTime.setHours(startHour);
    todayStartingTime.setMinutes(startMinute);


    let todayTime = new Date().getHours() + new Date().getMinutes() * (1/60);
    let startTime = parseFloat(startHour) + (startMinute * (1/60));
    let endTime = parseFloat(endHour) + (endMinute * (1/60));


    let today = new Date().getTime() - new Date().getTimezoneOffset()*60*1000;
    if(endTime < startTime && todayTime < endTime && todayTime >= 0) {
        //today = yesterday
        today -= 24*3600*1000;

    } 
    
    
    currentDay = currentDay.getTime() - new Date().getTimezoneOffset()*60*1000;
    todayStartingTime = todayStartingTime.getTime();
    
    // Add 24 hours if the endAt is lower than startAt
    
    if(endHour < startHour) {
        startHour -= 24;
    }
    if(endMinute < startMinute) {
        startMinute -= 60;
    }
   
   
    let hoursDifference = Math.abs(endHour - startHour);
    let minutesDifference = Math.abs(endMinute - startMinute);
    
    
    let todayEndingTime = todayStartingTime;
    todayEndingTime += hoursDifference*3600*1000;
    todayEndingTime += minutesDifference * 60 *1000;
    
    todayStartingTime = todayStartingTime - new Date().getTimezoneOffset()*60*1000;
    todayEndingTime = todayEndingTime- new Date().getTimezoneOffset()*60*1000;
    
    //console.log(new Date(todayStartingTime));
    //console.log(new Date(todayEndingTime));
    //console.log(new Date(today));
    
    return today >= todayStartingTime && today < todayEndingTime;

}

module.exports = isTimeInRange;