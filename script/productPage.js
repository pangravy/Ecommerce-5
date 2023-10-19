var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as productController from './service/productService.js';
import * as utilities from './utilities.js';
const productId = localStorage.getItem("selectedProduct");
let product;
let products;
let cartItemsString = localStorage.getItem("cartItems");
let cartItems = {};
if (cartItemsString != null && cartItemsString.length > 0) {
    cartItems = JSON.parse(cartItemsString);
}
function saveCartToLocalStorate() {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}
function addToCart(event) {
    const target = event.target;
    console.log(target.id);
    cartItems[target.id] = cartItems[target.id] == null ? 1 : cartItems[target.id] + 1;
    alert("Item has been added to your cart!");
    saveCartToLocalStorate();
}
function populateDate() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (productId) {
                product = yield productController.getProductById(parseInt(productId));
            }
            console.log(product);
            document.title = product.title;
            utilities.appendProductCard("product-container", product, addToCart);
            products = yield productController.getAllProductsInCategory(product === null || product === void 0 ? void 0 : product.category);
            utilities.appendProductCards("similar-products-container", products);
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    });
}
populateDate();
