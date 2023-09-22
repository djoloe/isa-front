const button = document.getElementById('register');
const email = document.getElementById('email');
const firstName = document.getElementById('firstName');
const password = document.getElementById('password');
const lastName = document.getElementById('lastName');
const passwordRepeat = document.getElementById('passwordRepeat');
const adress = document.getElementById('adress');

button.addEventListener('click' , (e) => {
    e.preventDefault();

    const data = {
        email : email.value,
        firstname : firstName.value,
        password : password.value,
        lastname : lastName.value,
        passwordrepeat : passwordRepeat.value,
        adress : adress.value
    }
    
    if(passwordRepeat.value === password.value){
        
    axios({
        method: 'POST',
        url: 'http://127.0.0.1:3000/register',
        data: data,
        headers: {
            "Content-type" : "application/json; charset=UTF-8"
        }
    })
    .then((response) => {
        if(response.status === 202){
            alert('same email!');
        } else if(response.status === 203) {
            window.location.href = 'http://127.0.0.1:5500/login/index.html';
        }
    })
    .catch((response) => {
    console.log('register->POST-> catch block');
    })
    } else {
        alert('password must be the same!');
    }
})

