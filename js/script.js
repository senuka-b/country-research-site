
loadCountries();



function loadCountries() {
    let row = document.getElementById("row");
    
    let htmlString = "";

    fetch("https://restcountries.com/v3.1/all")
    .then(res => res.json())
    .then(data => {

        data.forEach(country => {
            htmlString += `
                <div class="col m-3">
                    <div class="card" style="width: 20rem;">
                        <img src="${country.flags.png}" style="width: 20rem; height: 12rem;" class="card-img-top" alt="...">
                        <div class="card-body">
                        <h5 class="card-title">${country.name.common}</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary">${country.name.official}</h6>
                        <p class="card-text">
                            <ul>
                                <li><b>Capital</b> : ${country.capital}</li>
                                <li><b>Region</b> : ${country.region}</li>
                                <li><b>Population</b> : ${country.population}</li>
                            </ul>
                        </p>
                        <a  href="${country.maps.googleMaps}" class="btn btn-success mt-2" target="_blank">Google Maps link 🗺️ ↗️</a>
                        <input type="button" style="background-color: #009e79" class="btn btn-sm btn-success mt-2" onclick="createMoreInfoModal('${country.name.common}', name=true)" value="More info about ${country.name.common}">

                        </div>
                    </div>
                </div>        
            
`
        });

        row.innerHTML = htmlString;
       
    });
}

function createMoreInfoModal(value, name=false, full_name=false, code=false, language=false, currency=false) {
    let modalHTML = document.getElementById("modalMoreInfo");
    
    let url = name ? `https://restcountries.com/v3.1/name/${value}` 
     : language ? `https://restcountries.com/v3.1/lang/${value}`
     : full_name ? `https://restcountries.com/v3.1/name/${value}?fullText` 
     : code ? `https://restcountries.com/v3.1/alpha/${value}` 
     :  currency ? `https://restcountries.com/v3.1/currency/${value}`
     : "";

    fetch(url)
    .then(res => res.json())
    .then(data => {
        let country = data[0];

        modalHTML.innerHTML = `
        <div class=" modal-dialog modal-fullscreen modal-dialog-scrollable "  >
    
            <div class="modal-content modal-bg overlay" style="--url: url('${country.flags.png}');" >
                <div class="modal-header">
                    <h1 class="modal-title fw-bold text-white">${country.name.common}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body overlay " style="color: white;" >

                    <div>
                    
                    <div class="row text-center">

                        <img src="${country.flags.png}" class="w-25" >
                    </div>

                    <h4 class="pt-5">
                        <b>Name</b>
                    </h4>
                    <ul>
                        <li><p class="lead">Common : </p>${country.name.common}</li>
                        <li><p class="lead">Official : </p>${country.name.official}</li>
                        <li><p class="lead">Native : </p>${Object.values(country.name.nativeName)[0].official}</li>

                    </ul>

                    <h4 class="pt-5">
                        <b>Independent</b> : ${country.independent ? "yes" : "no"}
                    </h4>

                    <h4 class="pt-5">
                        <b>UN Member</b> : ${country.unMember ? "yes" : "no"}
                    </h4>

                    <h4 class="pt-5">
                        <b>Currencies</b> : ${Object.keys(country.currencies).toString()}
                    </h4>
                    
                    <h4 class="pt-5">
                        <b>Capital</b> : ${country.capital.toString()}
                    </h4>

                    <h4 class="pt-5">
                        <b>Region</b> : ${country.region}
                    </h4>
                    
                    <h4 class="pt-5">
                        <b>Languages</b> : ${Object.values(country.languages).toString()}
                    </h4>

                    <h4 class="pt-5">
                        <b>Latitude & Longitude</b>
                    </h4>

                    <ul>
                        <li><p class="lead">Latitude : </p>${country.latlng[0]}</li>
                        <li><p class="lead">Longitude : </p>${country.latlng[1]}</li>

                    </ul>

                    <h4 class="pt-5">
                        <b>Area</b> : ${country.area} km<sup>2</sup>
                    </h4>

                    <h4 class="pt-5">
                        <b>Population</b> : ${country.population}
                    </h4>

                    <h4 class="pt-5">
                        <b>Timezones</b> : ${country.timezones.toString()}
                    </h4>

                    </div>


                </div>
                <div class="modal-footer overlay">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                    <a href="${country.maps.googleMaps}" target="_blank" class="btn btn-primary">See Location ↗️</a>
                </div>
                </div>

        </div>`;

        let modal = new bootstrap.Modal("#modalMoreInfo");
        modal.show();


    });



}

let values = {
    name: true, // Default on load
    full_name: false,
    code: false,
    language: false,
    currency: false
}

function search() {
    let searchInput = document.getElementById("searchTextInput");

    // console.log(Object.values(values));

    createMoreInfoModal(searchInput.value, ...Object.values(values));
    searchInput.value = "";

}

function setValues(value_type) {
    let dropDown = document.getElementById("dropDown");
    let searchInput = document.getElementById("searchTextInput");


    switch (value_type) {
        case "name":
            values.name = true;

            for (const key in values) {
                if (Object.prototype.hasOwnProperty.call(values, key)) {
                    if (key !== "name") {
                        values[key] = false;
                    }
                    
                }
            }

            searchInput.placeholder = "Enter country name";
            dropDown.innerText = "Name";

            break;
    
        case "full_name":
            values.full_name = true;

            for (const key in values) {
                if (Object.prototype.hasOwnProperty.call(values, key)) {
                    if (key !== "full_name") {
                        values[key] = false;
                    }
                    
                }
            }

            searchInput.placeholder = "Enter country full name";
            dropDown.innerText = "Country Full Name";

            break;

        case "code":
            values.code = true;

            for (const key in values) {
                if (Object.prototype.hasOwnProperty.call(values, key)) {
                    if (key !== "code") {
                        values[key] = false;
                    }
                    
                }
            }

            searchInput.placeholder = "Enter country code";
            dropDown.innerText = "Country Code";



            break;

        case "language":
            values.language = true;

            for (const key in values) {
                if (Object.prototype.hasOwnProperty.call(values, key)) {
                    if (key !== "language") {
                        values[key] = false;
                    }
                    
                }
            }

            searchInput.placeholder = "Enter country language";
            dropDown.innerText = "Language";


            break;

        case "currency":
            values.currency = true;

            for (const key in values) {
                if (Object.prototype.hasOwnProperty.call(values, key)) {
                    if (key !== "currency") {
                        values[key] = false;
                    }
                    
                }
            }

            searchInput.placeholder = "Enter country currency";
            dropDown.innerText = "Currency";

            break;
        
        default:
            break;
    }
}