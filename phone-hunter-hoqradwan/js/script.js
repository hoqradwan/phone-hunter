document.getElementById('error-message').style.display ="none";
const allPhones = () => {
    const searchField = document.getElementById('search-box');
    const searchText = searchField.value;
    // searchField.value = '';
    // document.getElementById('error-message').style.display ="none";
    if(searchText == ''){
        document.getElementById('error-message').style.display ="block";
    }
    else{
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => showPhones(data.data))
    }
}

const showPhones = phones => {
    for (const phone of phones) {
        const phoneContainer = document.getElementById('phone-container');
        const div = document.createElement('div');

        div.innerHTML = ` 
        <div class="card m-auto w-50 border p-5">
        <div class="phone-pic">
            <img class="w-75" src="${phone.image}" alt="">
            <h2 class="mt-3">${phone.phone_name}</h2>
            <h5>${phone.brand}</h5>
            <button onclick = "phoneDetailUrl('${phone.slug}')" class="btn btn-success mt-3">Details</button>
        </div>
    </div> 
    `
        phoneContainer.appendChild(div);
        // console.log(phone);
    }
}

const phoneDetailUrl = id => {
    console.log(id);
    const url = ` https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showDetails(data.data))
}

const showDetails = details => {
    console.log(details.others);
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="card border w-50 m-auto p-5">
         <div>
            <img class="w-25" src="${details.image}" alt="">
            <h2 class="mt-3">${details.name}</h2>
            <h5>${details.brand}</h5>
            <h5>${details.releaseDate}</h5> 
            <h6> <span class="fw-bold">Sensors:</span> ${details.mainFeatures.sensors}</h6> 
            <h6> <span class="fw-bold">Bluetooth:</span> ${details.others.Bluetooth}</h6> 
            <h6> <span class="fw-bold">GPS:</span> ${details.others.GPS}</h6> 
            <h6> <span class="fw-bold">NFC:</span> ${details.others.NFC}</h6> 
            <h6> <span class="fw-bold">Radio:</span> ${details.others.Radio}</h6> 
            <h6> <span class="fw-bold">USB:</span> ${details.others.USB}</h6> 
            <h6> <span class="fw-bold">WLAN:</span> ${details.others.WLAN}</h6> 
        </div >
    </div > `
    phoneDetails.appendChild(div);
}