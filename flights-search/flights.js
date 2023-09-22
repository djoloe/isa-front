const stopsBox = document.getElementById('stops');
const adultsBox = document.getElementById('adults');
const classTripBox = document.getElementById('class-trip');
const fromValueBox = document.getElementById('fromFlight');
const toValueBox = document.getElementById('toFlight');
const departDate = document.getElementById('depart-date');
const returnDate = document.getElementById('return-date');
const searchButton = document.getElementById('search-flight-button');

searchButton.addEventListener('click', (e) => {
    e.preventDefault();

    const data = {
        stops : stopsBox.value,
        adults : adultsBox.value,
        class : classTripBox.value,
        from : fromValueBox.value,
        to : toValueBox.value,
        depart : departDate.value,
        return : returnDate.value
    }
     axios({
        method: 'post',
        url: 'http://127.0.0.1:3000/searchFlights',
        data: data,
        withCredentials: true,
        headers: {
            "Content-type" : "application/json; charset=UTF-8",
        }
    })
    .then((response) => {
        if(response.status === 204){
            alert(`Can't find flight by that criterium!`)
        } else{
            window.localStorage.setItem(200,JSON.stringify(response.data));
            window.localStorage.setItem('adults',adultsBox.value);
            window.location.href = 'http://127.0.0.1:5500/filteredFlight/filteredFlight.html';
        }
        })
    .catch((response) => {
    console.log('flights.js ->POST/searchFlights-> catch block');
    })
})


