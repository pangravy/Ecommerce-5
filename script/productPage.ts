import * as productController from './service/productService.js';
import * as utilities from './utilities.js'

const productId : string | null = localStorage.getItem("selectedProduct");
let product : Product;
let products : Product[];
let cartItemsString : string | null = localStorage.getItem("cartItems");
let cartItems : Record<string, number> = {};
if(cartItemsString != null && cartItemsString.length>0) {
    cartItems = JSON.parse(cartItemsString);
}

function saveCartToLocalStorate() {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

function addToCart(event: Event) {
    const target = event.target as HTMLElement;
    console.log(target.id);

    cartItems[target.id] = cartItems[target.id]==null ? 1 : cartItems[target.id]+1;
    alert("Item has been added to your cart!");

    saveCartToLocalStorate();
}

async function populateDate() {
    try {
        if(productId) {
            product = await productController.getProductById(parseInt(productId));
        }
        console.log(product);
        document.title = product.title;
        utilities.appendProductCard("product-container", product, addToCart);

        products =await  productController.getAllProductsInCategory(product?.category);
        utilities.appendProductCards("similar-products-container", products);
    } catch(error) {
        console.log(error);
        throw error;
    }
}

populateDate();




 

