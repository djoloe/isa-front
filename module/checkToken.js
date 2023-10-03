/* eslint-disable no-undef */
export function checkToken() {
  axios({
    method: "post",
    url: "http://127.0.0.1:3000/checkToken",
    withCredentials: true,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  })
    .then((response) => {
      if (response.status === 203) {
        alert(`Your session is over. Please log in again`);
        window.location.href = "http://127.0.0.1:5500/login/index.html";
      }
    })
    .catch((err) => {
      console.log("checkToken.js -> catch block" + err);
    });
}
