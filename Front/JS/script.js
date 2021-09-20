
const urlCameras = "http://localhost:3000/api/cameras";

    // fonction qui récupère les données de l'API et qui créer une carte produit
    function listProduct(elementArray) {
        
        for(let i of elementArray){
           
        let infoProduct = document.querySelector('#list_product');
            
        let div = document.createElement('div');
        const divContent=`
        <div class="col-12 col-md-5 col-xl-3">
        <div class="card mt-5"><a href=product.html#${i.name} class="stretched-link">
        <img class="card-img" src="${i.imageUrl}" alt="Un appareil photo vintage"></a>
        <div class="card-body text-center">
        <h2 class="card-title">${i.name}</h2>
        <p class="card-price">${i.price/100},00€</p>
        <p class="card-text">${i.description}</p>
        <button type="button" class="btn btn-dark">Voir le produit</button>
        </div>
        </div></div>`;
        div.innerHTML=divContent;
        infoProduct.appendChild(div);

        }
    }
  
// Appel de l'API
    function getApi(url) {
        fetch(url)
        .then(function(res){
            if(res.ok){
                return res.json();
            }
        })
        .then(function(x){
            listProduct(x);
        })
        
        .catch(function(err){
            console.log("Une erreur est survenue");
        })
        
    }
    getApi(urlCameras);
