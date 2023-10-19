var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as productService from './service/productService.js';
let cartItemsString = localStorage.getItem("cartItems");
let cartItems = {};
if (cartItemsString != null) {
    cartItems = JSON.parse(cartItemsString);
}
let products;
function responePay() {
    console.log(calculateTotal(products));
    var options = {
        "key": "rzp_test_PqpwwpJDSZU1jz",
        "amount": Math.round(calculateTotal(products) * 100),
        "currency": "INR",
        "name": "Acme Corp",
        "description": "Test Transaction",
        "image": "https://example.com/your_logo",
        "order_id": "",
        "handler": function (response) {
            localStorage.setItem("cartItems", "");
            location.assign("payment.html");
        },
        "prefill": {
            "name": "Gaurav Kumar",
            "email": "gaurav.kumar@example.com",
            "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
    };
    var rzp1 = new Razorpay(options);
    rzp1.on('payment.failed', function (response) {
        console.log(response);
    });
    try {
        console.log(rzp1);
        rzp1.open();
    }
    catch (err) {
        console.log(err);
    }
}
function navToCheckoutPage() {
    responePay();
}
function saveCartToLocalStorage() {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}
function getPriceById(id, products) {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == id) {
            return products[i].price;
        }
    }
    return 0;
}
function calculateTotal(products) {
    let total = 0;
    console.log(products);
    for (let i = 0; i < products.length; i++) {
        total += products[i].price * cartItems[products[i].id.toString()];
    }
    return total;
}
function updateUI(id) {
    console.log(id);
    const counter = document.getElementById(`cnt${id}`);
    const total = document.getElementById(`total${id}`);
    const grandTotal = document.getElementById('grand-total');
    if (cartItems[id] <= 0) {
        const prod = document.getElementById(`prod${id}`);
        products = products.filter(item => item.id != parseInt(id));
        delete cartItems[id];
        saveCartToLocalStorage();
        prod.remove();
    }
    else {
        counter.textContent = cartItems[id].toString();
        total.innerHTML = `<b>Total:</b> $${(getPriceById(parseInt(id), products) * cartItems[id]).toString()}`;
    }
    grandTotal.textContent = `$${calculateTotal(products).toFixed(2)}`;
}
function addToCart(event) {
    const target = event.target;
    cartItems[target.id] = cartItems[target.id] == null ? 1 : cartItems[target.id] + 1;
    saveCartToLocalStorage();
    updateUI(target.id);
}
function removeFromCart(event) {
    const target = event.target;
    cartItems[target.id] = cartItems[target.id] == null || cartItems[target.id] == 0 ? 0 : cartItems[target.id] - 1;
    saveCartToLocalStorage();
    updateUI(target.id);
}
function getCartProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        products = yield productService.getAllProducts();
        products = products.filter((item) => {
            return item.id.toString() in cartItems;
        });
        return products;
    });
}
function populateCartItems(products) {
    const container = document.getElementById("cart-item-holder");
    console.log(products);
    for (let i = 0; i < products.length; i++) {
        const row = document.createElement('div');
        row.innerHTML = `
            <div id="prod${products[i].id}" class="row card-item border border-width-2 mt-3">
                <img class="col-lg-1 col-md-2 col-sm-3 col-xs-4 col-5 col img-fluid"
                    src="${products[i].image}" alt="product_img" />
                <div class="col-lg-11 col-md-10 col-sm-9 col-xs-8 col-7 row align-items-center">
                    <h4 class="col-lg-4 col-12">${products[i].title}</h4>
                    <span class="card-text col-lg-3"><b>Price:</b>: $${products[i].price}</span>
                    <span id="total${products[i].id}" class="card-text col-lg-3"><b>Total:</b> $${products[i].price * cartItems[products[i].id.toString()]}</span>
                    <div class="btn-group col-lg-2 col-4" role="group">
                        <button id=${products[i].id} type="button" class="btn btn-secondary">-</button>
                        <button id=cnt${products[i].id} type="button" class="btn btn-secondary disabled">${cartItems[products[i].id.toString()]}</button>
                        <button id=${products[i].id} type="button" class="btn btn-secondary">+</button>
                    </div>
                </div>
            </div>
        `;
        const buttons = row.getElementsByTagName('div')[2].getElementsByTagName('button');
        buttons[2].addEventListener("click", (event) => addToCart(event));
        buttons[0].addEventListener("click", (event) => removeFromCart(event));
        const grandTotal = document.getElementById('grand-total');
        grandTotal.textContent = `$${calculateTotal(products).toFixed(2)}`;
        const checkoutButton = document.getElementById('checkout-btn');
        checkoutButton.addEventListener("click", navToCheckoutPage);
        container === null || container === void 0 ? void 0 : container.appendChild(row);
    }
}
getCartProducts()
    .then(res => populateCartItems(res))
    .catch(error => console.log(error));
