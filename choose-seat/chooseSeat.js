/* eslint-disable no-undef */
import { checkToken } from "../module/checkToken.js";
const reserveButton = document.getElementById("reserve-button");
const containerClick = document.getElementById("left");
const adults = localStorage.getItem("adults");
const localStorageObjectFlight = JSON.parse(localStorage.getItem(201));
const list = document.querySelectorAll(".single-div");
const deleteButton = document.getElementById("delete-button");
let arrayDiv = [];
let selectedDiv;
let UserHaveDivs;

window.addEventListener("load", async (e) => {
  e.preventDefault();
  checkToken();
  checkFlightDiv();
});

containerClick.onclick = (e) => {
  let seat;
  if (checkSameDiv(e.target) === false) {
    if (!e.target.classList.contains("single-div")) {
      alert("click on seat");
      seat = true;
    } else if (UserHaveDivs) {
      alert(
        `You already reserved tickets for flight from ${localStorageObjectFlight.fromPlace} to ${localStorageObjectFlight.toPlace}!`
      );
    } else if (!seat && adults > arrayDiv.length) {
      selectedDiv = e.target;
      selectedDiv.style.background = "purple";
      arrayDiv.push(selectedDiv);
    } else {
      alert(`maximum ticket to reserve is ${adults} tickets`);
    }
  }
};

reserveButton.addEventListener("click", () => {
  let arrayBase = [];
  if (arrayDiv.length === Number(adults)) {
    for (let i = 0; i < list.length; i++) {
      for (let j = 0; j < arrayDiv.length; j++) {
        if (list[i] === arrayDiv[j]) {
          arrayBase.push(arrayDiv[j].id);
        }
      }
    }
    saveUserDiv(arrayBase);
  } else {
    alert(`you must reserve ${adults} tickets`);
  }
});

deleteButton.addEventListener("click", () => {
  if (!UserHaveDivs) {
    alert(`You have no reservation yet!`);
  } else {
    deleteReservationForUser();
    alert("Reservations have been cancelled!");
    location.reload();
  }
});

async function deleteReservationForUser() {
  await axios({
    method: "post",
    url: "http://127.0.0.1:3000/removeReservation",
    withCredentials: true,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  })
    .then((response) => {
      if (response.data === true) {
        deletedDivsColor();
      }
    })
    .catch(() => {
      console.log("chooseSeats.js ->POST/seats -> catch block");
    });
}

async function saveUserDiv(array) {
  let data = {
    array: array,
    idFlight: localStorageObjectFlight.idAvioCompany,
  };
  await axios({
    method: "post",
    url: "http://127.0.0.1:3000/seat",
    data: data,
    withCredentials: true,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  })
    .then((response) => {
      if (response.data === true) {
        alert("your tickets are reserved");
        window.location.href =
          "http://127.0.0.1:5500/friend-list/friend-list.html";
      } else {
        alert(`can't reserve tickets.`);
      }
    })
    .catch(() => {
      console.log("chooseSeats.js ->POST/seats -> catch block");
    });
}

async function checkFlightDiv() {
  const id = localStorageObjectFlight.idAvioCompany;

  let data = {
    idFlight: id,
  };
  await axios({
    method: "post",
    url: "http://127.0.0.1:3000/loadSeatsFlight",
    data: data,
    withCredentials: true,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  })
    .then((response) => {
      colorDivs(response.data);
    })
    .catch((error) => {
      console.log("chooseSeats.js ->POST/loadSeats -> catch block" + error);
    });
}

function colorDivs(divsToken) {
  const idUser = divsToken.idUser;
  const divs = divsToken.divs;
  for (let i = 0; i < divs.length; i++) {
    let parsedSeat = JSON.parse(divs[i].seat);
    for (let j = 0; j < parsedSeat.length; j++) {
      let div = document.getElementById(`${parsedSeat[j]}`);
      if (idUser == divs[i].idUser) {
        arrayDiv.push(div);
        div.style.background = "yellow";
        UserHaveDivs = true;
      } else {
        div.style.background = "gray";
      }
    }
  }
}

function checkSameDiv(selectedDiv) {
  let exist = false;
  for (let i = 0; i < arrayDiv.length; i++) {
    if (selectedDiv === arrayDiv[i]) {
      selectedDiv.style.background = "antiquewhite";
      arrayDiv.splice(i, 1);
      exist = true;
    } else {
      exist = false;
    }
  }
  return exist;
}

function deletedDivsColor() {
  for (let i = 0; i < arrayDiv.length; i++) {
    arrayDiv[i].style.background = "antiquewhite";
  }
  arrayDiv.length = 0;
  UserHaveDivs = false;
}
