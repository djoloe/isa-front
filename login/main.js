/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
//test branch
const button = document.getElementById("login-button");
const aRef = document.getElementById("dont-have");
const email = document.getElementById("email");
const password = document.getElementById("password");

aRef.addEventListener("click", () => {
  window.location.href = "http://127.0.0.1:5500/register/register.html";
});

button.addEventListener("click", (e) => {
  e.preventDefault();

  const data = {
    email: email.value,
    password: password.value,
  };

  if (notNullData(data) === true) {
    sentLoginData(data);
  } else {
    alert("empty field!");
  }
});

function sentLoginData(data) {
  axios({
    method: "post",
    url: "http://127.0.0.1:3000/login",
    data: data,
    withCredentials: true,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  })
    .then((response) => {
      if (response.status === 202) {
        alert("Wrong username or password!");
      } else {
        localStorage.setItem("accessToken", `${response.data}`);
        window.location.href =
          "http://127.0.0.1:5500/flights-search/flights.html";
      }
    })
    .catch((err) => {
      console.log("login ->POST-> catch block" + err);
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
