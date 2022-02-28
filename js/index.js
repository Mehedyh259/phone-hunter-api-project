const toggleSpinner = prop => {
    document.getElementById('spinner').style.display = prop;
}


const getPhone = () => {
    // document.getElementById('phones').textContent = '';
    toggleSpinner('block');
    const search = document.getElementById('search-phone').value.toLowerCase();
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhones(data.data))

}

const displayPhones = phones => {
    const container = document.getElementById('phones');
    container.textContent='';
    if (phones.length != 0) {
        const first20Phones = phones.slice(0, 20);
        first20Phones.forEach(phone => {
            const div = document.createElement('div');
            div.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-lg-4', 'my-2');
            div.innerHTML = `
                <div class="card bg-light">
                    <img src=${phone.image} style="width: 100%;" class="card-img-top img-thumbnail" alt="...">
                    <div class="card-body">
                        <h5 class="card-title fw-bold">Brand: ${phone.brand}</h5>
                        <small class="card-text">Model: ${phone.phone_name}</small><br>
                        <button onclick="showDetails('${phone.slug}')" class="btn btn-sm btn-primary mt-2">Details</button>
                    </div>
                </div> 
            `;
            container.appendChild(div);
        });
    } else {
        console.log('error');
    }
    toggleSpinner('none');
}