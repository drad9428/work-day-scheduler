var currentDayEl = $("#currentDay");
var containerEl = $(".time-block");

currentDayEl.append(moment().format("dddd") + ", " + moment().format("MMM Do"))

var auditSchedule = function(timeblockEl){
    var hour = $(timeblockEl).find("span").text().trim();
    var time = moment(hour, "LT")

    $(timeblockEl).removeClass("past present future")

    if(Math.ceil(moment().diff(time, "hour")) > 0){
        $(timeblockEl).find("p").addClass("past")
    }
    else if(Math.ceil(moment().isSame(time, "hour"))){
        $(timeblockEl).find("p").addClass("present")
    }
    else{
        $(timeblockEl).find("p").addClass("future")
    }
}

for(var i = 0; i < containerEl.length; i++){
    auditSchedule(containerEl[i])
}

setInterval(function(){
    for(var i = 0; i < containerEl.length; i++){
        auditSchedule(containerEl[i])
    }
    console.log("update")
}, (1000 * 60))