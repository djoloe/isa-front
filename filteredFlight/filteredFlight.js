

const departDate = document.getElementById('depart');
const returnDate = document.getElementById('return');
const stops = document.getElementById('stops');
const timeTravel = document.getElementById('time-travel');
const classTrip = document.getElementById('class-trip');
const departCity = document.getElementById('depart-city');
const destination = document.getElementById('destination');
const adults = document.getElementById('adults');
const price = document.getElementById('price');
const buttonInfo = document.getElementById('aircompany-button');
const avioBoxForImage = document.getElementById('avio-picture-id');
const aviocompanyName = document.getElementById('aviocompany-name');
const aviocompanyAdress = document.getElementById('aviocompany-adress');
const aviocompanyPromo = document.getElementById('aviocompany-promo');
const destinationList = document.getElementById('destinations-ul');
const destinationPromo = document.getElementById('destination-promo');
const mainContentAvio = document.getElementById('about-company');

let click = 0;

window.addEventListener('load', () => {
    const objectFromLocal = JSON.parse(localStorage.getItem(200));
    const adultsStorage = localStorage.getItem('adults');
    
    for(let i = 0; i < objectFromLocal.length; i++){
       departDate.innerHTML = objectFromLocal[i].departDate;
       returnDate.innerHTML = objectFromLocal[i].returnDate;
       stops.innerHTML = objectFromLocal[i].stops;
       timeTravel.innerHTML = objectFromLocal[i].timeTravel + ' ' + 'hours';
       classTrip.innerHTML = objectFromLocal[i].classTrip;
       departCity.innerHTML = objectFromLocal[i].fromPlace;
       destination.innerHTML = objectFromLocal[i].toPlace;
       adults.innerHTML = adultsStorage;
       price.innerHTML = calculatePrice(adultsStorage,objectFromLocal[i].price);
    }
})

function calculatePrice(adults,price){
    let stringHTML = price;
    if(adults > 1){
        stringHTML = parseInt(price) *  Number(adults) + '$';
    } 
    return stringHTML;
}

buttonInfo.addEventListener('click', async (e) => {
    e.preventDefault();
 
   if(click % 2 === 0){
    const idAvio = getIdAvio(localStorage.getItem(200));
    data = {
        id : idAvio
    }
    await axios({
        method: 'post',
        url: 'http://127.0.0.1:3000/companyInfo',
        data: data,
        withCredentials: true,
        headers: {
            "Content-type" : "application/json; charset=UTF-8",
        }
    })
    .then((response) => {
        parseAvioContentData(response.data);
        })   
    .catch((response) => {
         console.log('filteredFlight.js ->POST/company-info -> catch block');
    })
    click++;
   } else {
    deleteContent();
    buttonInfo.innerHTML = 'About company';
    click++;
   }
    
})


function getIdAvio(localObject){
    let id;
    object = JSON.parse(localObject);
    for(let i = 0; i < object.length; i++){
        id = object[i]["idAvioCompany"];
    }
    return id;
}


function parseAvioContentData(data){
    const parsedData = JSON.parse(JSON.stringify(data));
    choosePicture(parsedData.idAvioCompany);
    aviocompanyName.innerHTML = parsedData.name;
    aviocompanyAdress.innerHTML = parsedData.adress;
    aviocompanyPromo.innerHTML = parsedData.promo;
    destinationPromo.innerHTML = 'Destinations:'
    populateULList(parsedData.destinations);
    buttonInfo.innerHTML = 'Hide content';
}


function choosePicture(id){
    const img = document.createElement('img');
    avioBoxForImage.appendChild(img);
    switch(id){
        case 1:
            img.src = '/svg/airplane-svgrepo-2.svg';
        break;
        case 2:
            img.src = '/svg/airplane-svgrepo-3.svg';
        break;
        case 3:
            img.src = '/svg/airplane-svgrepo-4.svg';
        break;
    }
}

function populateULList(destinations){
    const parsedDestinations = JSON.parse(destinations);
    for (i = 0; i < parsedDestinations.length; ++i) {
        let li = document.createElement('li');
        li.innerText = parsedDestinations[i];
        destinationList.appendChild(li);
    }
}

function deleteContent(){
    avioBoxForImage.innerHTML = '';
    aviocompanyName.innerHTML = '';
    aviocompanyAdress.innerHTML = '';
    aviocompanyPromo.innerHTML = '';
    destinationList.innerHTML = '';
    destinationPromo.innerHTML = '';
}