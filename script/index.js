import * as productController from './service/productService.js';
import * as utilities from './utilities.js';
const cardContainer = document.getElementById("product-cards-container");
productController.getAllProducts()
    .then(res => utilities.appendProductCards("product-cards-container", res))
    .catch(error => console.log(error));
