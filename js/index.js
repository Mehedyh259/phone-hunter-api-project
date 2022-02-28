const toggleSpinner = prop => {
    document.getElementById('spinner').style.display = prop;
}


const getPhone = () => {
    // document.getElementById('phones').textContent = '';
    toggleSpinner('block');
    const search = document.getElementById('search-phone').value.toLowerCase();

    fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`)
        .then(res => res.json())
        .then(data => displayPhones(data.data.slice(0,20)))
        
}

const displayPhones = phones =>{
    if(phones.length == 0){
        console.log('not found')
    }else{
        console.log(phones);
    }
    toggleSpinner('none');
}