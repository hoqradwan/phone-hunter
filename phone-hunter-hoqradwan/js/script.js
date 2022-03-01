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
    // .then(data => console.log(data))
    // console.log(url);
    // console.log(searchValue);
}

const showPhones = phones => {
    for (const phone of phones) {
        const phoneContainer = document.getElementById('phone-container');
        const div = document.createElement('div');

        div.innerHTML = ` 
        <div class="card m-auto w-50 border p-5">
        <div class="phone-pic">
            <img class="w-25" src="${phone.image}" alt="">
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
    // const url = `  https://openapi.programming-hero.com/api/phone/apple_iphone_13_pro_max-11089`;
    fetch(url)
        .then(res => res.json())
        .then(data => showDetails(data.data))
}

const showDetails = details => {
    console.log(details.others);
    const phoneDetails = document.getElementById('phone-details');
    const div = document.createElement('div');
    div.innerHTML = ` <div class="card m-auto w-50 border p-5">
        <div class="phone-pic">
            <img class="w-25" src="${details.image}" alt="">
            <h2 class="mt-3">${details.name}</h2>
            <h5>${details.brand}</h5>
            <h5>${details.releaseDate}</h5> 
            <h6> Sensors: ${details.mainFeatures.sensors}</h6> 
            <h6> Bluetooth: ${details.others.Bluetooth}</h6> 
            <h6> GPS: ${details.others.GPS}</h6> 
            <h6> NFC: ${details.others.NFC}</h6> 
            <h6> Radio: ${details.others.Radio}</h6> 
            <h6> USB: ${details.others.USB}</h6> 
            <h6> WLAN: ${details.others.WLAN}</h6> 
        </div >
    </div > `
    
    phoneDetails.appendChild(div);
    // const sensors = details.mainFeatures.sensors;
    // for(const sensor of sensors){
    //     const h5 = document.createElement('h5');
    //     h5.innerHTML = `${ sensor } `;
    //     div.appendChild(h5);
    // }
    
}