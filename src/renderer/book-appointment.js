function containsOnlyCharacters(inputValue) {
  for (var i = 0; i < inputValue.length; i++) {
    var charCode = inputValue.charCodeAt(i);
    if (!(charCode >= 65 && charCode <= 90) && !(charCode >= 97 && charCode <= 122)) {
      return false;
    }
  }
  return true;
}


function checkEmail() {
  var emailInput = document.getElementById("emailInput").value;
  var atIndex = emailInput.indexOf("@");
  var dotIndex = emailInput.lastIndexOf(".");
  var hasAtAndDot = atIndex > 0 && dotIndex > atIndex;

  if (hasAtAndDot) {
    return true; 
  } else {
    alert("Email is invalid");
    return false;
  }
}

var currentIndex = 0;
var slides = document.querySelectorAll(".slide");

function moveImages(direction) {
  if (direction === "left") {
    currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
  } else {
    currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
  }

  var slideWidth = slides[currentIndex].offsetWidth;
  var newPosition = -currentIndex * slideWidth;
  document.getElementById("imageContainer").style.transform = "translateX(" + newPosition + "px)";
}

function openpopup(event) {
  event.preventDefault();
  var isValidEmail = checkEmail();
  var nameInput = document.getElementById("nameInput").value;
  var isValidName = containsOnlyCharacters(nameInput);
  var inputs = document.querySelectorAll('input[type="text"], input[type="tel"], input[type="email"], input[type="date"], input[type="time"], textarea');
  var isValid = true;

  inputs.forEach(function(input) {
      if (!input.value.trim()) {
          isValid = false;
      }
  });

  if (isValid && isValidEmail && isValidName) {
      var popup = document.getElementById("popup");
      popup.classList.add("open-popup");
  } else if (!isValidEmail) {
      alert("Please enter the correct format of the E-mail");
  }else if(!isValidName){
        alert("Please enter the correct format of the Name")
      } else {
      alert("Please fill out all fields before submitting.");
  }
}

function closepopup(){
  var popup = document.getElementById("popup");
  popup.classList.remove("open-popup");
  location.reload();
}
