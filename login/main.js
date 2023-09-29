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
  axios({
    method: "post",
    url: "http://127.0.0.1:3000/login",
    data: data,
    withCredentials: true,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      if (response.status === 202) {
        alert("Wrong username or password!");
      } else {
        window.location.href =
          "http://127.0.0.1:5500/flights-search/flights.html";
      }
    })
    .catch(() => {
      console.log("login ->POST-> catch block");
    });
});
