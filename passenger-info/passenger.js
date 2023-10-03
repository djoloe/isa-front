/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { checkToken } from "../module/checkToken.js";
const passengerText = document.getElementById("passenger-count");
const passengers = JSON.parse(localStorage.getItem("passengers"));
const adults = Number(localStorage.getItem("adults"));
const dateBox = document.getElementById("date");
const firstNameBox = document.getElementById("first-name");
const lastNameBox = document.getElementById("last-name");
const emailBox = document.getElementById("email");
const nextButton = document.getElementById("next-button");
let idUserCookie = window.Cookies.get("id");
let arrayFriends = [];
let passengersNumber = 2;
let i = 1;

window.addEventListener("load", (e) => {
  e.preventDefault();
  checkToken();
  passengerText.innerHTML = `Passengers 1 of ${passengers.length}`;
  (firstNameBox.value = passengers[0].firstName),
    (lastNameBox.value = passengers[0].lastName);

  checkUserFriends();
});

nextButton.addEventListener("click", () => {
  let friend = {
    firstName: firstNameBox.value,
    lastName: lastNameBox.value,
    contact: emailBox.value,
    date: dateBox.value,
  };
  emailBox.value = "";
  date.value = "";
  arrayFriends.push(friend);
  if (i < passengers.length - 1) {
    passengerText.innerHTML = `Passengers ${i + 1} of ${passengers.length}`;
    firstNameBox.value = passengers[i].firstName;
    lastNameBox.value = passengers[i].lastName;
    i++;
  } else if (i === passengers.length - 1) {
    nextButton.innerHTML = "Enter";
    passengerText.innerHTML = `Passengers ${i + 1} of ${passengers.length}`;
    firstNameBox.value = passengers[i].firstName;
    lastNameBox.value = passengers[i].lastName;
    i++;
  } else {
    nextButton.remove();
    sendData();
  }
});

function sendData() {
  let data = {
    array: arrayFriends,
    idUser: idUserCookie,
  };
  axios({
    method: "POST",
    url: "http://127.0.0.1:3000/friends",
    data: data,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      console.log(response);
      window.location.href =
        "http://127.0.0.1:5500/filteredFlight/filteredFlight.html";
    })
    .catch(() => {
      console.log("passengers.js-> sendData -> POST -> catch block");
    });
}

function deleteFriends() {
  let data = {
    idUser: idUserCookie,
  };

  axios({
    method: "POST",
    url: "http://127.0.0.1:3000/deleteFriends",
    data: data,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then(() => {
      console.log("friends deleted");
    })
    .catch(() => {
      console.log("passengers.js-> deleteFriends -> POST -> catch block");
    });
}

async function checkUserFriends() {
  let data = {
    idUser: idUserCookie,
  };
  await axios({
    method: "POST",
    url: "http://127.0.0.1:3000/checkUserFriends",
    data: data,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      if (response.data === true) {
        let decisition = confirm(
          `Do you wanna delete friends's reservations ?`
        );
        if (decisition) {
          deleteFriends();
        } else {
          window.location.href =
            "http://127.0.0.1:5500/filteredFlight/filteredFlight.html";
        }
      }
    })
    .catch(() => {
      console.log("passengers.js-> checkUserFriends -> POST -> catch block");
    });
}
