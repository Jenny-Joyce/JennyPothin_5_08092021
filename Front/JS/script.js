
const urlCameras = "http://localhost:3000/api/cameras";


    // fonction qui affichera la liste des produits
    function listProduct(elementArray) {
        
        for(let i of elementArray){
           
        let infoProduct = document.querySelector('.card-info');
            
        let div = document.createElement('div');// création d'un div 
        div.className = "col-12 col-md-4 col-xl-3";
        const divContent=`
        <div class="card mt-5"><a href=product.html?${i._id} class="stretched-link">
        <img class="card-img" src="${i.imageUrl}" alt="Un appareil photo vintage"></a>
        <div class="card-body text-center">
        <h2 class="card-title">${i.name}</h2>
        <p class="card-price">${i.price/100},00€</p>
        <button type="button" class="btn btn-dark">Voir le produit</button>
        </div>
        </div>`;
        div.innerHTML=divContent;// integration de la div dans le html
        infoProduct.appendChild(div);

        }
    }
  
// Appel de l'API
    function getApi(url) {
        fetch(url)
        .then(function(res){ // test de la promise
            if(res.ok){ 
                return res.json();
            }
        })
        .then(function(x){ // appel de la fonction affichage des produits
            listProduct(x);
        })
        
        .catch(function(err){
            console.log("Une erreur est survenue");
        })
        
    }
    getApi(urlCameras);
