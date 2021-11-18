
const urlCameras = "http://localhost:3000/api/cameras";


    /* fonction qui intègre certaines caractéristiques 
    des listes des produits contenu dans l'API, dans une carte 
     qui sera intégrer à la page index.
    */
    function listProduct(elementArray) {
        
        for(let i of elementArray){
           
        let infoProduct = document.querySelector('.card-info');
            
        let div = document.createElement('div'); 
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
        div.innerHTML=divContent;
        infoProduct.appendChild(div);

        }
    }
  
/* Appel de l'API qui affiche la fonction listProduct.
Renvoie un booléen true ou false. 
*/
    function getApi(url) {
        fetch(url)
        .then(function(res){ 
            if(res.ok){ 
                return res.json();
            }
        })
        .then(function(x){ 
            listProduct(x);
            return true;
        })
        
        .catch(function(err){
            console.log("Une erreur est survenue");
            return false;
        })
        
    }
    getApi(urlCameras);
