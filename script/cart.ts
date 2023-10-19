import * as productService from './service/productService.js';

let cartItemsString: string | null = localStorage.getItem("cartItems");
let cartItems: Record<string, number> = {};
if (cartItemsString != null) {
    cartItems = JSON.parse(cartItemsString);
}
let products: Product[];

function responePay() {
    console.log(calculateTotal(products));
    var options = {
        "key": "rzp_test_PqpwwpJDSZU1jz", // Enter the Key ID generated from the Dashboard
        "amount": Math.round(calculateTotal(products) * 100), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Acme Corp", //your business name
        "description": "Test Transaction",
        "image": "https://example.com/your_logo",
        "order_id": "",//"order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": function (response : any) {
            localStorage.setItem("cartItems", "");
            location.assign("payment.html");
        },
        "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
            "name": "Gaurav Kumar", //your customer's name
            "email": "gaurav.kumar@example.com",
            "contact": "9000090000"  //Provide the customer's phone number for better conversion rates 
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
    };
    var rzp1 = new Razorpay(options);
    rzp1.on('payment.failed', function (response: any) {
        console.log(response);
    });

    try{
    console.log(rzp1);
    rzp1.open();
    }
    catch(err){
        console.log(err);
    }
}

function navToCheckoutPage() {
    responePay();
}

function saveCartToLocalStorage() {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

function getPriceById(id: number, products: Product[]): number {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == id) {
            return products[i].price;
        }
    }
    return 0;
}

function calculateTotal(products: Product[]): number {
    let total: number = 0;
    console.log(products);
    for (let i = 0; i < products.length; i++) {
        total += products[i].price * cartItems[products[i].id.toString()];
    }
    return total;
}

function updateUI(id: string) {
    console.log(id);
    const counter: HTMLButtonElement = document.getElementById(`cnt${id}`) as HTMLButtonElement;
    const total: HTMLSpanElement = document.getElementById(`total${id}`) as HTMLSpanElement;
    const grandTotal: HTMLSpanElement = document.getElementById('grand-total') as HTMLSpanElement;

    if (cartItems[id] <= 0) {
        const prod: HTMLDivElement = document.getElementById(`prod${id}`) as HTMLDivElement;
        products = products.filter(item => item.id != parseInt(id));
        delete cartItems[id];
        saveCartToLocalStorage();
        prod.remove();
    } else {
        counter.textContent = cartItems[id].toString();
        total.innerHTML = `<b>Total:</b> $${(getPriceById(parseInt(id), products) * cartItems[id]).toString()}`;
    }
    grandTotal.textContent = `$${calculateTotal(products).toFixed(2)}`;
}

function addToCart(event: Event) {
    const target = event.target as HTMLElement;

    cartItems[target.id] = cartItems[target.id] == null ? 1 : cartItems[target.id] + 1;

    saveCartToLocalStorage();
    updateUI(target.id);
}

function removeFromCart(event: Event) {
    const target = event.target as HTMLElement;

    cartItems[target.id] = cartItems[target.id] == null || cartItems[target.id] == 0 ? 0 : cartItems[target.id] - 1;

    saveCartToLocalStorage();
    updateUI(target.id)
}

async function getCartProducts(): Promise<Product[]> {
    products = await productService.getAllProducts();

    products = products.filter((item) => {
        return item.id.toString() in cartItems;
    })

    return products;
}

function populateCartItems(products: Product[]) {
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
        `

        const buttons = row.getElementsByTagName('div')[2].getElementsByTagName('button');
        buttons[2].addEventListener("click", (event) => addToCart(event));
        buttons[0].addEventListener("click", (event) => removeFromCart(event));

        const grandTotal: HTMLSpanElement = document.getElementById('grand-total') as HTMLSpanElement;
        grandTotal.textContent = `$${calculateTotal(products).toFixed(2)}`;

        const checkoutButton: HTMLButtonElement = document.getElementById('checkout-btn') as HTMLButtonElement;
        checkoutButton.addEventListener("click", navToCheckoutPage);

        container?.appendChild(row);
    }
}


getCartProducts()
    .then(res => populateCartItems(res))
    .catch(error => console.log(error));
