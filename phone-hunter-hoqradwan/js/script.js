document.getElementById('error-message').style.display = "none";

// All phones section
const allPhones = () => {
    const searchField = document.getElementById('search-box');
    const searchText = searchField.value;
    searchField.value = '';
    document.getElementById('error-message').style.display ="none";
    if (searchText == '') {
        document.getElementById('error-message').style.display = "block";
    }
    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => showPhones(data.data))
    }
}

// Show phones section
const showPhones = phones => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    if (phones.length == 0) {
        document.getElementById('error-message').style.display = "block";
    }
    phones.slice(0, 20).forEach(phone => {
        const div = document.createElement('div');
        div.innerHTML = ` 
    <div class="card m-auto w-75 border p-5">
    <img class="card-img-top w-25" src="${phone.image}" alt="">
        <div class="card-body">
            <h2 class="card-title mt-3">${phone.phone_name}</h2>
            <h5>${phone.brand}</h5>
            <button onclick = "phoneDetailUrl('${phone.slug}')" class="btn btn-success mt-3">Details</button>
        </div>
    </div> 
    `
        phoneContainer.appendChild(div);
    })
}

// getting phone id url
const phoneDetailUrl = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showDetails(data.data))
}

// phone details section
const showDetails = details => {
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="card border p-4 mb-5">
         <div class="card-body d-flex justify-content-center align-items-center">
         <div>
         <img class="w-75" src="${details.image}" alt="">
         </div>
         <div>
         <h2 class="card-title mt-3">${details.name}</h2>
         <h5>${details.brand}</h5>
         <p>${details.releaseDate === ''?'No release date found': `${details.releaseDate}`}</p> 
         <p> <span class="fw-bold">Sensors:</span> ${details.mainFeatures.sensors}</p> 
         <p> <span class="fw-bold">Bluetooth:</span> ${details.others.Bluetooth}</p> 
         <p> <span class="fw-bold">GPS:</span> ${details.others.GPS}</p> 
         <p> <span class="fw-bold">NFC:</span> ${details.others.NFC}</p> 
         <p> <span class="fw-bold">Radio:</span> ${details.others.Radio}</p> 
         <p> <span class="fw-bold">USB:</span> ${details.others.USB}</p> 
         <p> <span class="fw-bold">WLAN:</span> ${details.others.WLAN}</p> 
         </div> 
        </div >
    </div > `
    phoneDetails.appendChild(div);
}