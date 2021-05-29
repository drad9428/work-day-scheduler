var currentDayEl = $("#currentDay");

currentDayEl.append(moment().format("dddd") + ", " + moment().format("MMM Do"))