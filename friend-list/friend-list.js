const searchBox = document.getElementById("search-box-input");
const trElements = document.querySelectorAll("tr");
const checkBoxes = document.querySelectorAll("input[type=checkbox]");
const inviteButton = document.getElementById("invite-friend");
const departDate = document.getElementById("depart");
const returnDate = document.getElementById("return");
const stops = document.getElementById("stops");
const timeTravel = document.getElementById("time-travel");
const classTrip = document.getElementById("class-trip");
const departCity = document.getElementById("depart-city");
const destination = document.getElementById("destination");
const adults = document.getElementById("adults");
const price = document.getElementById("price");
const adultsStorage = Number(localStorage.getItem("adults"));

let arrayFriends = [];

window.addEventListener("load", () => {
  const objectFromLocal = JSON.parse(localStorage.getItem(200));

  for (let i = 0; i < objectFromLocal.length; i++) {
    departDate.innerHTML = objectFromLocal[i].departDate;
    returnDate.innerHTML = objectFromLocal[i].returnDate;
    stops.innerHTML = objectFromLocal[i].stops;
    timeTravel.innerHTML = objectFromLocal[i].timeTravel + " " + "hours";
    classTrip.innerHTML = objectFromLocal[i].classTrip;
    departCity.innerHTML = objectFromLocal[i].fromPlace;
    destination.innerHTML = objectFromLocal[i].toPlace;
    adults.innerHTML = adultsStorage;
    price.innerHTML = calculatePrice(adultsStorage, objectFromLocal[i].price);
  }
});

searchBox.addEventListener("input", (e) => {
  e.preventDefault();
  let valueForSearch = e.target.value;

  for (let i = 1; i < trElements.length; i++) {
    let td = trElements[i].getElementsByTagName("td");
    if (checkCaseSensitive(td, valueForSearch)) {
      trElements[i].style.display = "";
    } else {
      trElements[i].style.display = "none";
    }
  }
});

inviteButton.addEventListener("click", (e) => {
  e.preventDefault();
  checkBoxes.forEach(function (checkbox) {
    if (checkbox.checked === true) {
      checkBoxRowValues(checkbox);
    }
  });
  localStorage.setItem("passengers", JSON.stringify(arrayFriends));
  if (arrayFriends.length === adultsStorage) {
    window.location.href =
      "http://127.0.0.1:5500/passenger-info/passenger.html";
  } else {
    alert(` You can reserve ${adultsStorage} tickets`);
  }
});

function checkCaseSensitive(td, valueForSearch) {
  let sameValue = false;
  let firstName = td[0].innerText.toUpperCase();
  let lastName = td[1].innerText.toUpperCase();

  if (
    firstName.includes(valueForSearch.toUpperCase()) ||
    lastName.includes(valueForSearch.toUpperCase())
  ) {
    sameValue = true;
  }

  return sameValue;
}

function checkBoxRowValues(checkbox) {
  const row = checkbox.parentElement.parentElement;
  let td = row.getElementsByTagName("td");
  const firstName = td[0].innerText;
  const lastName = td[1].innerText;

  let friend = {
    firstName: firstName,
    lastName: lastName,
  };

  arrayFriends.push(friend);
}

function calculatePrice(adults, price) {
  let stringHTML = price;
  if (adults > 1) {
    stringHTML = parseInt(price) * Number(adults) + "$";
  }
  return stringHTML;
}
