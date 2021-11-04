const productId = window.location.href.split("?")[1].trim();
const cameraUrl = "http://localhost:3000/api/cameras/"+ productId;
console.log(cameraUrl);

 
/* fonction qui ajout un article dans le panier
 elle retourne 0 en cas d'ajout dans le panier
 sinon retourne un code d'erreur:
 -1 = pas d'option choisit;
-2 = quantité invalide, choix entre 1 et 10;
-3 = l'article est déjà dans le panier.
*/
function addBasket(){
    
    const elementSelect = document.querySelector(".form-select");
    const spanId = document.querySelector("#id_product");
    const priceProduct = document.querySelector("#price");
    const inputNumber = document.querySelector('#amount');
    const imgProduct = document.querySelector('#img').src;
    const descProduct = document.querySelector('#description').textContent;
    let opt = elementSelect.options[elementSelect.selectedIndex].value;
    const toAdd = imgProduct + "#" + descProduct  + "#" + priceProduct.innerHTML + "#" + inputNumber.value;
    const basket = localStorage.getItem(spanId.innerHTML);
    console.log(spanId);
    // controle du choix de l'option
    if(opt == "-1"){
        alert("Veuillez selectionner une option")
        return -1;
    }
    // controle de la quantité  
    if(parseInt(inputNumber.value) <= 0 || parseInt(inputNumber.value) >= 10){
        alert("Merci de renseigner une valeur entre 1 et 10 !")
        return -2;
    }
    // controle de doublon d'un article dans le panier
    if(basket != ""){
        localStorage.removeItem(spanId.innerHTML);
        localStorage.setItem(spanId.innerHTML, toAdd);
        console.log(localStorage.getItem(spanId.innerHTML) + ",le panier contient maintenant" + localStorage.length);
        return -3;
    }
    // si tous les tests sont ok, on ajout l'article dans le panier
    localStorage.setItem(spanId.innerHTML, toAdd);
    alert('Le produit à été ajouter au panier');
    console.log(localStorage.getItem(spanId.innerHTML) + ",le panier contient maintenant" + localStorage.length);
    return 0;
}

// fonction qui affiche le produit sélectionné sur la page produit
function displayCamera(camera){

    const product = document.querySelector("#container");

    product.className = "col col-md-6 col-xl-3"
    product.innerHTML = `
    <div class="card mt-5">
        <span id="id_product" style="visibility:hidden">${camera._id}</span>
        <a href="product.html?${camera._id}">
        <img class="card-img" id="img" src="${camera.imageUrl}" alt="Un appareil photo vintage"></a>
        <div class="card-body text-center">
            <h2 class="card-title" id="name">${camera.name}</h2>
            <p class="card-text" id="description">${camera.description}</p>
            <select class="form-select mb-3" name="lense"></select>
            <input type="number" id="amount" value="0" min=0 max=10>
            <p class="card-price" id="price">${camera.price/100},00€</p>
            <button type="button" class="btn btn-dark" id="add_basket">Ajouter au panier</button>
        </div>
    </div>`;

        let listOption = '<option selected value="-1">Selectionner un objectif</option>';
        // boucle qui affiche la liste des options
        // pour les objectifs
        for(let i in camera.lenses){ 
            const optionLense = `<option value="${camera.lenses[i]}">${camera.lenses[i]}</option>`
            listOption += optionLense;
        }
        let selectOption = document.querySelector('.form-select');
        selectOption.innerHTML = listOption;
        
        const buttonBasket = document.querySelector('#add_basket');
        buttonBasket.addEventListener('click', addBasket);
}
// appel de l'API avec l'id produit
function idApi(url){
    fetch(url)
    .then(function(res){
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


