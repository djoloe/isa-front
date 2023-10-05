/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const button = document.getElementById("register");
const email = document.getElementById("email");
const firstName = document.getElementById("firstName");
const password = document.getElementById("password");
const lastName = document.getElementById("lastName");
const role = document.getElementById("role");
const adress = document.getElementById("adress");

button.addEventListener("click", (e) => {
  e.preventDefault();

  const data = {
    email: email.value,
    firstname: firstName.value,
    password: password.value,
    lastname: lastName.value,
    role: role.value,
    adress: adress.value,
  };
  if (notNullData(data) === true) {
    registerUser(data);
  } else {
    alert("empty field!");
  }
});

function registerUser(data) {
  axios({
    method: "POST",
    url: "http://127.0.0.1:3000/register",
    data: data,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      if (response.status === 202) {
        alert("same email!");
      } else if (response.status === 203) {
        window.location.href = "http://127.0.0.1:5500/login/index.html";
      }
    })
    .catch(() => {
      console.log("register->POST-> catch block");
    });
}

function notNullData(data) {
  for (const [key, value] of Object.entries(data)) {
    if (value === "") {
      return false;
    }
  }
  return true;
}
