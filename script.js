let burgers = ['Hamburger', 'Cheeseburger', 'Newyorker',
    'Big Angus Cheese', 'Chrunchy Chicken', 'Grilled Chicken'];


let ingredients = ['mit Zwiebeln, Tomaten, sauren Gurken, Salat, Ketchup und Mayonnaise',
    'mit zart schmelzendem Cheese, Zwiebeln, Tomaten, sauren Gurken, Salat, Ketchup und Mayonnaise',
    'mit 125g Rindfleisch, Sesam Brötchen, Ketchup, Salat, Snack-Dip, zart schmelzendem Cheese, Röstzwiebeln und sauren Gurken',
    'mit Big Angus Rindfleisch, zart schmelzendem Cheese, Zwiebeln, Tomaten, sauren Gurken, Salat, Ketchup, Mayonnaise und Senf',
    'mit Crunchy Chicken, Tomaten, Salat und Mayonnaise', 'mit Grilled Chicken, Ciabatta-Brötchen, Bergkäse, Rucola, roter Paprika, Chipotle-Sauce, Curry-Dip und Ketchup'];

let prices = [7.99, 8.99, 7.99, 10.99, 8.99, 9.99];


let basketBurger = [];
let basketPrice = [];
let basketAmount = [];

function onPageLoad() {
    renderContent();
    renderEmptyBasketHTML();
}


function renderContent() {
    let content = document.getElementById('content');
    for (let i = 0; i < burgers.length; i++) {
        const burger = burgers[i];
        const ingredient = ingredients[i];
        const price = prices[i];
        content.innerHTML += renderContentHTML(burger, ingredient, price, i);
    }
}


function renderContentHTML(burger, ingredient, price, i) {
    const formattedPrice = price.toFixed(2).replace('.', ','); 
    return `
        <div title="Burger zum Warenkorb" class="burgers" onclick="addToBasket(${i})">
            <div>
                <h3>${burger}</h3>
                <div><i>${ingredient}</i></div>
                <div>${formattedPrice} €</div>
            </div>
            <img src="img/plus.png" class="icon">
        </div>
        `;

}

function renderEmptyBasketHTML() {
    let basket = document.getElementById('basket');
    basket.innerHTML += `
        <div>
            <img src="img/cart.png" class="icon">
            <div><h4>Fülle deinen Warenkorb</h4></div>
            <p>Füge leckere Gerichte hinzu.</p>
        </div>
        `;
}


function renderBasket() {
    let basket = document.getElementById('basket');
    basket.innerHTML = '';
    for (let i = 0; i < basketBurger.length; i++) {
        const addBurger = basketBurger[i];
        const addPrice = basketPrice[i];
        const addAmount = basketAmount[i];
        basket.innerHTML += renderBasketHTML(addBurger, addPrice, addAmount, i); 
    }
    totalPayment();
}


function formatSubTotal(subTotal) {
    return subTotal.toFixed(2).replace('.', ','); 
}

function renderBasketHTML(addBurger, addPrice, addAmount, i) {
    let subTotal = addAmount*addPrice;
    const formattedSubTotal = formatSubTotal(subTotal);
    return `
        <div>
            <p>${addAmount} x ${addBurger}: ${formattedSubTotal} €</p>
            <div class="icons-container">
                <div title="Menge reduzieren" onclick="substractBurger(${i})"><img src="img/minus.ico" class="icon"></div>
                <div title="Menge erhöhen" onclick="addBurger(${i})"><img src="img/plus.ico" class="icon"></div>
                <div title="Auswahl löschen" onclick="deleteOrder(${i})"><img src="img/trash.ico" class="icon"></div>
            </div>
        </div>
    `;
}



function addToBasket(i) { 
    let addedBurger = burgers[i]; 
    let addedPrice = prices[i];
    let index = basketBurger.indexOf(addedBurger); 
    if (index == -1) { 
        basketBurger.push(addedBurger)
        basketPrice.push(addedPrice)
        basketAmount.push(1) 
    } else {
        basketAmount[index]++ 
    }
    renderBasket();
}


function addBurger(i) {
    basketAmount[i]++;
    renderBasket();
}



function substractBurger(i) {
    if(basketAmount[i] <= 1)
    {
        basketAmount.splice(i, 1); 
        basketBurger.splice(i, 1);
        basketPrice.splice(i, 1);
        renderBasket();

        if (basketAmount==0) {
            renderEmptyBasketHTML();
        }
    }
    if (basketAmount[i]>=1) {
        basketAmount[i]--
    }
    renderBasket();
}


function deleteOrder(i) {
    basketAmount.splice(i, 1); 
    basketBurger.splice(i, 1);
    basketPrice.splice(i, 1);
    renderBasket();

    if (basketAmount==0) {
        renderEmptyBasketHTML();
    }
}



function totalPayment() {
    document.getElementById('sum').innerHTML = '';
    let total = 0;
    for (let i = 0; i < basketAmount.length; i++) {
        total += basketPrice[i] * basketAmount[i];
        sum.innerHTML = totalPaymentHTML (total);
    }
}

function formatTotal(total) {
    return total.toFixed(2).replace('.', ','); 
}


function formatDeliveryCost(deliveryCost) {
    return deliveryCost.toFixed(2).replace('.', ','); 
}


function formatTotalAndDelivery(totalAndDelivery) {
    return totalAndDelivery.toFixed(2).replace('.', ','); 
}

function totalPaymentHTML(total, i) {
    const formattedTotal = formatTotal(total);
    const deliveryCost = 4; 
    const formattedDeliveryCost = formatDeliveryCost(deliveryCost);
    const totalAndDelivery = total+deliveryCost;
    formattedTotalAndDelivery = formatTotalAndDelivery(totalAndDelivery);
    document.getElementById('mobilebasket').innerHTML = `<b>Bezahlen (${formattedTotalAndDelivery}) €</b>`;
    return generatePaymentHTML(formattedTotal, formattedDeliveryCost,formattedTotalAndDelivery, formattedTotalAndDelivery);
}

function generatePaymentHTML(formattedTotal, formattedDeliveryCost,formattedTotalAndDelivery, formattedTotalAndDelivery) {
    return `
    <div class="pay-box"><div>Zwischensumme:</div><div>${formattedTotal} €</div></div>
    <div class="pay-box"><div>Lieferkosten:</div><div>${formattedDeliveryCost} €</div></div>
    <div class="pay-box"><div><b>Gesamtsumme:</b></div><div><b>${formattedTotalAndDelivery} €</b></div></div>
    <button title="Weiter zum Bezahlen" onclick="showPaymentMessage()"><b>Bezahlen (${formattedTotalAndDelivery} €)</b></button>
    `;
}


function showPaymentMessage() {
    document.getElementById('payment').classList.remove('display-none');
    document.getElementById('successfull').classList.innerHTML=text;
}



function showBasket() {
    const overlayBasket = document.getElementById('overlay-basket');
    overlayBasket.classList.replace('basket-container', 'basket-container-mobile');
}


function closeBasket(){
    const overlayBasket = document.getElementById('overlay-basket');
    overlayBasket.classList.replace('basket-container-mobile', 'basket-container');
}