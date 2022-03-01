const toggleSpinner = prop => {
    document.getElementById('spinner').style.display = prop;
}


const getPhone = () => {
    document.getElementById('phones').textContent = '';
    toggleSpinner('block');
    const search = document.getElementById('search-phone').value.toLowerCase();
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhones(data.data))

}

const displayPhones = phones => {
    const container = document.getElementById('phones');
    container.textContent = '';
    if (phones.length != 0) {
        const first20Phones = phones.slice(0, 20);
        first20Phones.forEach(phone => {
            const div = document.createElement('div');
            div.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-lg-4', 'g-5');
            div.innerHTML = `
                <div class="card bg-light py-5 rounded">
                    <img src=${phone.image} class="card-img-top w-50 mx-auto" alt="...">
                    <div class="card-body">
                        <h5 class="card-title fw-bold"> ${phone.phone_name}</h5>
                        <p class="card-text fw-bolder">Brand: ${phone.brand}</p>
                        <div class="d-grid">
                            <button type="button" onclick="getDetails('${phone.slug}')" class="btn btn-outline-success rounded-pill">show details</button>
                        </div>
                       
                    </div>
                </div> 
            `;
            container.appendChild(div);
        });
    } else {
        container.innerHTML = `

            <div class="col-md-10 mt-3 mx-auto alert alert-danger" role="alert">
                Phone Does Not Exist !!
            </div>
        
        `;
    }
    toggleSpinner('none');
}

const getDetails = phone_id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${phone_id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showDetails(data.data))
}

const showDetails = details =>{
    const detailsContainer = document.getElementById('details');
    detailsContainer.textContent='';
    console.log(details);
    detailsContainer.innerHTML = `  
    <div class=" col-12 col-md-8 col-lg-8 mt-3 mx-auto">
        <div class="card bg-light py-5 rounded">
        <img src=${details.image} class="card-img-top w-50 mx-auto" alt="...">
        <div class="card-body">
            <h4 class="card-title fw-bold text-success"> ${details.name}</h4>
            <p class="card-text"><span class="fw-bolder">Brand: </span>  ${details.brand}</p>
            <p class="card-text"><span class="fw-bolder">Release Date: </span>  ${details.releaseDate ? details.releaseDate:'not available'}</p>
            <h5 class="text-danger fw-bold">Main Features</h5>
            <p class="card-text"><span class="fw-bolder">Cipset: </span> ${details.mainFeatures.chipSet}</p>
            <p class="card-text"><span class="fw-bolder">Display Size: </span> ${details.mainFeatures.displaySize}</p>
            <p class="card-text"><span class="fw-bolder">Memory: </span> ${details.mainFeatures.memory}</p>
            <p class="card-text"><span class="fw-bolder">Storage: </span> ${details.mainFeatures.storage}</p>
            <p class="card-text"><span class="fw-bolder">Sensors: </span> ${details.mainFeatures.sensors}</p>

            <h5 class="text-danger fw-bold">Others Features</h5>
            ${details.others? `
            
                <p class="card-text"><span class="fw-bolder">Blutooth: </span>  ${details.others.Bluetooth}</p>
                <p class="card-text"><span class="fw-bolder">GPS: </span>  ${details.others.GPS}</p>
                <p class="card-text"><span class="fw-bolder">NFC: </span>  ${details.others.NFC}</p>
                <p class="card-text"><span class="fw-bolder">Radio: </span>  ${details.others.Radio}</p>
                <p class="card-text"><span class="fw-bolder">USB: </span>  ${details.others.USB}</p>
                <p class="card-text"><span class="fw-bolder">WLAN: </span>  ${details.others.WLAN}</p>
            
            `: 'Not Available'}
            
            </div>
         </div> 
    </div>
    `;
    
}
