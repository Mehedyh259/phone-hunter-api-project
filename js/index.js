// preloader toggle
const toggleSpinner = prop => {
    document.getElementById('spinner').style.display = prop;
}

// get phones by search text
const getPhone = () => {
    document.getElementById('phones').textContent = '';
    document.getElementById('details').textContent = '';
    const search = document.getElementById('search-phone').value.toLowerCase();
    if(search == ''){
        document.getElementById('phones').innerHTML = `
            <div class="col-md-10 mt-3 mx-auto alert alert-danger" role="alert">
                Search Field Is Empty !!!!
            </div>`
    }else{
        toggleSpinner('block');
        const url = `https://openapi.programming-hero.com/api/phones?search=${search}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayPhones(data.data, search))
    }
}

// load all phones 
const loadAll = searchText=>{
    document.getElementById('load-more').style.setProperty('display','none','important');
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayRemainingPhones(data.data))
}

// display remaining phones more than 20
const displayRemainingPhones = phones =>{
    const remainingPhones = phones.slice(20,phones.length);
    const container = document.getElementById('phones');
    remainingPhones.forEach(phone => {
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
    })

    
}


// display first 20 phones if more than 20 exist
const displayPhones = (phones, search) => {
    
    const container = document.getElementById('phones');
    container.textContent = '';
    const arrayLength = phones.length;
    if (arrayLength != 0) {
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
        })

        if(arrayLength > 20){
            const buttonDiv = document.createElement('div');
            buttonDiv.classList.add('d-grid','col-md-10','mx-auto','my-5');
            buttonDiv.setAttribute('id','load-more');
            buttonDiv.innerHTML = `
            <button onclick = "loadAll('${search}')" class="btn btn-primary rounded" type="button">Load More Phones</button>
            `;
            container.appendChild(buttonDiv);
            console.log(arrayLength);
        }

    } else {
        container.innerHTML = `
            <div class="col-md-10 mt-3 mx-auto alert alert-danger" role="alert">
                Phone Does Not Exist !!
            </div>
        `;
    }
    toggleSpinner('none');
}

// get phones detail by phone id
const getDetails = phone_id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${phone_id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showDetails(data.data))
}

const showDetails = details =>{
    const detailsContainer = document.getElementById('details');
    detailsContainer.textContent='';
    // console.log(details);
    detailsContainer.innerHTML = `  
    <div class=" col-12 col-md-8 col-lg-8 mt-3 mx-auto">
        <div class="card bg-light py-5 rounded">
        <img src=${details.image} class="card-img-top w-50 mx-auto" alt="...">
        <div class="card-body">
            <h4 class="card-title fw-bold text-success"> ${details.name}</h4>

            <p class="card-text"><span class="fw-bolder">Brand: </span>  ${details.brand}</p>

            <p class="card-text"><span class="fw-bolder">Release Date: </span>  ${details.releaseDate ? details.releaseDate:'Not Available'}</p>

            <h5 class="text-danger fw-bold">Main Features</h5>
            <p class="card-text"><span class="fw-bolder">Cipset: </span> ${details.mainFeatures.chipSet ? details.mainFeatures.chipSet : 'not available'}</p>

            <p class="card-text"><span class="fw-bolder">Display Size: </span> ${details.mainFeatures.displaySize ? details.mainFeatures.displaySize : 'not available'}</p>

            <p class="card-text"><span class="fw-bolder">Memory: </span> ${details.mainFeatures.memory ? details.mainFeatures.memory : 'not available'}</p>

            <p class="card-text"><span class="fw-bolder">Storage: </span> ${details.mainFeatures.storage ? details.mainFeatures.chipSet : 'not available'}</p>
            
            <p class="card-text"><span class="fw-bolder">Sensors: </span> ${details.mainFeatures.sensors ? details.mainFeatures.sensors.map(element => element).join(", ") : 'not available'}</p>

            <h5 class="text-danger fw-bold">Others Features</h5>
            ${details.others ? `
            
                <p class="card-text"><span class="fw-bolder">Blutooth: </span>  ${details.others.Bluetooth ? details.others.Bluetooth : 'not available'}</p>
                <p class="card-text"><span class="fw-bolder">GPS: </span>  ${details.others.GPS ? details.others.GPS : 'not available'}</p>
                <p class="card-text"><span class="fw-bolder">NFC: </span>  ${details.others.NFC ? details.others.NFC : 'not available'}</p>
                <p class="card-text"><span class="fw-bolder">Radio: </span>  ${details.others.Radio ? details.others.Radio : 'not available'}</p>
                <p class="card-text"><span class="fw-bolder">USB: </span>  ${details.others.USB ? details.others.USB : 'not available'}</p>
                <p class="card-text"><span class="fw-bolder">WLAN: </span>  ${details.others.WLAN ? details.others.WLAN : 'not available'}</p>
            
            `: 'Not Available'}
            
            </div>
         </div> 
    </div>
    `;
    
}
