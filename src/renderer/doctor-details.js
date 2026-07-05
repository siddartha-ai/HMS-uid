var currentDateElement = null;
var currentTimeElement = null;
function colorDate(clickedElement) {
    if (currentDateElement !== null) {
        currentDateElement.classList.remove('highlight');
    }
    clickedElement.classList.toggle('highlight');
    currentDateElement = clickedElement;
}


function colorTime(clickedElement) {
    if (currentTimeElement !== null) {
        currentTimeElement.classList.remove('highlight');
    }
    clickedElement.classList.toggle('highlight');
    currentTimeElement = clickedElement;
}

function createTimeButtons() {
    var timeContainer = document.getElementById("timecontainer");
    var hours = 0;
    var minutes = 0;
    var period = 'AM';

    for (var i = 0; i < 48; i++) { 
        var button = document.createElement("button");
        button.classList.add("btn");
        button.textContent = padZero(hours) + ":" + padZero(minutes) + " " + period;
        button.onclick = function() { colorTime(this); };
        timeContainer.appendChild(button);

        minutes += 30;
        if (minutes === 60) {
            minutes = 0;
            hours++;
        }
        if (hours === 12 && minutes === 0) {
            period = period === 'AM' ? 'PM' : 'AM';
        }
    }
}

function padZero(num) {
    return num < 10 ? "0" + num : num;
}

window.onload = createTimeButtons;
