// on récupère les données envoyés au backend
const order = JSON.parse(localStorage.getItem('orderId'));
//on récupère l'orderId
const orderID = order.orderId;
//on affiche l'orderId sur la page de confirmation
document.querySelector('#order_id').innerHTML = orderID;
const price = JSON.parse(localStorage.getItem('price'));
document.querySelector('#total_price').innerHTML = price.toFixed(2) + "€";
//on vide le localstorage
localStorage.clear();
