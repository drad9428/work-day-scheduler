var currentDayEl = $("#currentDay");
var containerEl = $(".time-block");
var events = [{name:"",time:"9AM"},{name:"",time:"10AM"},{name:"",time:"11AM"},{name:"",time:"12PM"},{name:"",time:"1PM"},{name:"",time:"2PM"},{name:"",time:"3PM"},{name:"",time:"4PM"},{name:"",time:"5PM"}];

//display current day
currentDayEl.append(moment().format("dddd") + ", " + moment().format("MMM Do"))

//change color based on time
var auditSchedule = function(timeblockEl){
    //get time label and current formatted time
    var hour = $(timeblockEl).find("span").text().trim();
    var time = moment(hour, "LT")

    //clear previous tags for refresh
    $(timeblockEl).removeClass("past present future")

    //color code based on time
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

//initial color coding
for(var i = 0; i < containerEl.length; i++){
    auditSchedule(containerEl[i])
}

//edit text on click
$(".time-block").on("click", "p", function(){
    //get current text and create textarea to edit
    var text = $(this).text().trim()
    var textInput = $("<textarea>").addClass("col-10 mb-0").val(text)

    //switch to textarea
    $(this).replaceWith(textInput)
    textInput.trigger("focus")
})

//display text on click off
$(".time-block").on("blur", "textarea", function(){
    //get current text and create p tag to display
    var text = $(this).val().trim()
    var textDisplay = $("<p>").addClass("col-10 mb-0").text(text)
    
    //record data for event object
    var eventText = text
    var eventTime = $(this).siblings(".hour").text();
    
    //switch to p tag with text
    $(this).replaceWith(textDisplay)

    //refresh to display correct colors
    for(var i = 0; i < containerEl.length; i++){
        auditSchedule(containerEl[i])
    }

    for(var i = 0; i < events.length; i++){
        if(events[i].time === eventTime){
            events[i].name = eventText;
        }
    }
})



var saveEvent = function(){
    localStorage.setItem("event", JSON.stringify(events));
}

//save event on click
$(".time-block").on("click", "button", function(){
    saveEvent();
})

//refresh timer
setInterval(function(){
    for(var i = 0; i < containerEl.length; i++){
        auditSchedule(containerEl[i])
    }
    console.log("update")
}, (1000 * 60))