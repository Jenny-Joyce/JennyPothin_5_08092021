const productId = window.location.href.split("?")[1].trim();
const cameraUrl = "http://localhost:3000/api/cameras/"+ productId;
console.log(cameraUrl);

function displayCamera(camera){
    const product = document.querySelector("#container");

    product.className = "col col-md-4 col-xl-3"
    product.innerHTML = `
    <div class="card mt-5"><a href=product.html?${camera._id} class="stretched-link">
        <img class="card-img" src="${camera.imageUrl}" alt="Un appareil photo vintage"></a>
        <div class="card-body text-center">
        <h2 class="card-title">${camera.name}</h2>
        <p class="card-text">${camera.description}</p>
        <select class="form-select mb-3" name="lense">
        </select>
        <p class="card-price">${camera.price/100},00€</p>
        <button type="button" class="btn btn-dark">Ajouter au panier</button>
        </div>
        </div>`;

        for(let i in camera.lenses){
            let option = document.querySelector('.form-select');
            const optionLense = `<option selected>Sélectionner un objectif</option>
            <option value="lenses">${camera.lenses}</option>`
            option.innerHTML = optionLense;
        }

}

function idApi(url){
    fetch(url)
    .then(function (res){
        if(res.ok){
            return res.json();
        }
    })
    .then(function(value){
        displayCamera(value);
    })
    .catch(function(err){
        console.log(err);
    })
}
idApi(cameraUrl)