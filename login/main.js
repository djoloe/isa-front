

const button = document.getElementById('login-button');
const form = document.getElementById('form-id');
const aRef = document.getElementById('dont-have');
const email = document.getElementById('email');
const password = document.getElementById('password');
const dontHave = document.getElementById('dont-have');


aRef.addEventListener('click', ()  => {
    window.location.href = 'http://localhost/register/register.html';
})


button.addEventListener('click', (e) => { 
    e.preventDefault();

    const data = {
        email : email.value,
        password : password.value
    }
     axios({
        method: 'post',
        url: 'http://127.0.0.1:3000/login',
        data: data,
        withCredentials: true,
        headers: {
            "Content-type" : "application/json; charset=UTF-8",
        }
    })
    .then((response) => {
        if(response.status === 202){
            alert('Wrong username or password!');
        } else {
             window.location.href = 'http://127.0.0.1:5500/flights-search/flights.html';
            
        }
    })
    .catch((response) => {
    console.log('login ->POST-> catch block');
})

})
