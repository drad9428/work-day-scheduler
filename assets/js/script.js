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

$(".time-block").on("click", "p", function(){
    var text = $(this).text().trim()
    var textInput = $("<textarea>").addClass("col-10 mb-0").val(text)

    $(this).replaceWith(textInput)
    textInput.trigger("focus")
})

$(".time-block").on("blur", "textarea", function(){
    var text = $(this).val().trim()
    var textDisplay = $("<p>").addClass("col-10 mb-0").text(text)

    $(this).replaceWith(textDisplay)

    for(var i = 0; i < containerEl.length; i++){
        auditSchedule(containerEl[i])
    }
    console.log($(this.val))
})

$(".time-block").on("click", "button", function(){
    console.log("clicked")
})

setInterval(function(){
    for(var i = 0; i < containerEl.length; i++){
        auditSchedule(containerEl[i])
    }
    console.log("update")
}, (1000 * 60))