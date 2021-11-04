let product = "";
let productDetails = [];
let listProducts = "";
let linePrice = 0;
let totalPrice = 0;
const productList = [];
const contact = {};



// Fonction qui ajoute en ligne un produit dans le récap du panier
function addProductRow(rowToCreate, index) {
    // calcul du prix contenu sur une ligne
    linePrice = parseFloat(rowToCreate[2]) * parseInt(rowToCreate[3]);
    // prix total du panier 
    totalPrice += linePrice;

    listProducts += `<tr>
    <td class="col col-md-3 col-xl-4"><img class="card-img" id="img" src="${rowToCreate[0]}" alt="Un appareil photo vintage"></td>
    <td class="align-middle">${rowToCreate[1]}</td>
    <td class="align-middle">${rowToCreate[2]}</td>
    <td class="align-middle">${rowToCreate[3]}</td>
    <td class="align-middle">${linePrice}</td>
    <td class="align-middle"><input type="button" class="delete_button p-1 btn btn-danger" id="${index}" value="X" onclick="deleteProductRow(this.id);location.reload();"></td>
    </tr>
    `
}
// fonction qui supprime un élément du panier
function deleteProductRow(index){
    localStorage.removeItem(localStorage.key(index));
}
localStorage.removeItem("orderId")
// boucle qui parcourt, récupère et affiche les données du localstorage
for(let i = 0; i < localStorage.length; i++){
    product = localStorage.getItem(localStorage.key(i));
    productDetails = product.split("#");
    addProductRow(productDetails, i);
    productList.push(localStorage.key(i));
}

let recapBasket = document.querySelector('#details_basket');
recapBasket.innerHTML = `
<h1 class="mb-4">Récapitulatif</h1>
<table class="table table-sm" id="my_table">
<thead><tr>
<th scope="col">Article</th>
<th scope="col">Description</th>
<th scope="col">Prix</th>
<th scope="col">Qté</th>
<th></th>
<th></th>
</tr></thead>
<tbody>${listProducts}</tbody>
<tfoot><th></th>
<th></th>
<th scope="col">Total :</th>
<th></th>
<th scope="col">${totalPrice}</th>
<th></th>
</tfoot>
</table>

`

//bouton qui vide le panier et qui recharge la page 
const btnClear = document.querySelector('#clear_basket');

btnClear.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
    alert('Votre panier va être supprimer');

});

//************* Formulaire ****************/

// fonction qui check la validité de l'email
function checkInputEmail(email) {
    const regexEmail = new RegExp('^[a-zA-z0-9.-_]+[@]{1}[a-z]+[.]{1}[a-z]{2,4}$', 'g');
    return regexEmail.test(email);
    
}
// fonction qui check la validité des inputs sans chiffres(ex : nom de famille, ville)
function checkInputTextOnly(textOnly) {
    const regexTextOnly = new RegExp('[a-zA-Z-]+', 'g');
    return regexTextOnly.test(textOnly);
    
}
// fonction qui check la validité des inputs avec chiffres(ex: adresse, code postal)
function checkInputText(text) {
    const regexText = new RegExp('[a-zA-Z0-9-]+', 'g');
    return regexText.test(text);
   
}


/*
on vérifie les données du formulaire avant l'envoi au backend
-1 : email invalidé;
-2 : prénom invalidé;
-3 : nom invalidé;
-4 : adresse invalidé;
-5 : ville invalidé;
*/ 
const formSubmit = document.querySelector('#form');

formSubmit.addEventListener('submit', (e) =>{
const inputFirstName = document.getElementById('firstName').value;
const inputLastName = document.querySelector('#lastName').value;
const inputEmail = document.querySelector('#email').value;
const inputAddress = document.querySelector('#address').value;
const inputCity = document.querySelector('#city').value;

    if(!checkInputEmail(inputEmail)) {
        e.preventDefault();
        alert('Email invalide');
        return -1;
    }
    if(!checkInputText(inputFirstName)){
        e.preventDefault();
        alert('Prénom invalide');
        return -2;
    }
    if(!checkInputTextOnly(inputLastName)){
        e.preventDefault();
        alert('Nom invalide');
        return -3;
    }
    if(!checkInputText(inputAddress)){
        e.preventDefault();
        alert('Adresse non valide');
        return -4
    }
    if(!checkInputTextOnly(inputCity)){
        e.preventDefault();
        alert('Ville invalide');
        return -5
    }
    const formValid = document.forms["form"];

    
    // boucle qui parcourt et récupère les éléments du formulaire
    for(let i = 0; i < 5; i++){
        contact[formValid[i].id] = formValid[i].value;
    }
    e.preventDefault();
    validOrder();
});

console.log(contact);

//fonction qui lors de la validation du formulaire, envoie au backend les éléments du panier et les données du contact
function validOrder (){
const finalObject = {
    contact: contact, 
    products: productList
    };
    console.log(finalObject);
    
    fetch("http://localhost:3000/api/cameras/order", {
        method:"POST",
        headers:{
            'Accept': 'application/json', 
            'Content-Type':'application/json'
        },
        body:JSON.stringify(finalObject)
           
        })
        .then(rawJSON => rawJSON.json())
        .then(json => {
            console.log("RESPONSE",json);
            let order = JSON.stringify(json)
            localStorage.setItem("orderId", order);
            window.location.href="./confirmation.html";
            console.log(window.location);

        })
        .catch(err=> console.log(err));

        console.log(productList);
}
