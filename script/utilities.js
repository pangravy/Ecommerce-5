export function appendProductCards(parentDivId, products) {
    const container = document.getElementById(parentDivId);
    const navToProductPage = (event) => {
        var _a, _b, _c;
        const target = event.target;
        if (target.id != parentDivId && ((_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.id) != undefined && (/^[0-9]*$/.test((_b = target.parentElement) === null || _b === void 0 ? void 0 : _b.id))) {
            localStorage.setItem("selectedProduct", (_c = target.parentElement) === null || _c === void 0 ? void 0 : _c.id.toString());
            location.assign("productPage.html");
        }
    };
    container === null || container === void 0 ? void 0 : container.addEventListener("click", navToProductPage);
    for (let i = 0; i < products.length; i++) {
        const card = document.createElement('div');
        card.setAttribute("class", "card");
        card.setAttribute("id", products[i].id.toString());
        const cardBody = document.createElement('div');
        cardBody.setAttribute("class", "card-body d-flex flex-column");
        cardBody.setAttribute("id", products[i].id.toString());
        card.appendChild(cardBody);
        const img = document.createElement('img');
        img.setAttribute("class", "card-img-top");
        img.src = products[i].image;
        cardBody.appendChild(img);
        const title = document.createElement('span');
        title.setAttribute("class", "fw-bold");
        title.textContent = products[i].title;
        cardBody.appendChild(title);
        const price = document.createElement('span');
        price.setAttribute("class", "text-danger mt-1");
        price.textContent = `$${products[i].price}`;
        cardBody.appendChild(price);
        const ratingContainer = document.createElement('div');
        ratingContainer.setAttribute("class", "d-flex mb-4");
        cardBody.appendChild(ratingContainer);
        for (let j = 0; j < 5; j++) {
            const filledStar = document.createElement("i");
            filledStar.setAttribute("class", "bi bi-star-fill text-warning");
            const emptyStar = document.createElement("i");
            emptyStar.setAttribute("class", "bi bi-star");
            if (j < Math.floor(products[i].rating.rate)) {
                ratingContainer.appendChild(filledStar);
            }
            else {
                ratingContainer.appendChild(emptyStar);
            }
        }
        const count = document.createElement('span');
        count.textContent = `(${products[i].rating.count})`;
        ratingContainer.appendChild(count);
        const button = document.createElement('button');
        button.setAttribute("class", "btn btn-secondary mt-auto");
        button.textContent = "Buy Now";
        cardBody.appendChild(button);
        container === null || container === void 0 ? void 0 : container.appendChild(card);
    }
}
export function appendProductCard(parentDivId, product, handleClick) {
    const productContainer = document.getElementById(parentDivId);
    const row = document.createElement("div");
    row.setAttribute("class", "row justify-content-between mg-sm-0 m-4 gap-4");
    // row.innerHTML = `
    //     <img class="col-md-3 col-sm-6 col img-fluid"
    //     src="${product.image}" alt="product_img" />
    //     <div class="col">
    //         <h2>${product.title}</h2>
    //         <p class="text-secondary">${product.description}</p>
    //         <span class="text-danger card-text">$${product.price}</span>
    //         <div class="d-flex">
    //             <span><i class="bi bi-star-fill text-warning"></i>
    //                 <i class="bi bi-star-fill text-warning"></i>
    //                 <i class="bi bi-star-fill text-warning"></i>
    //                 <i class="bi bi-star"></i>
    //                 <i class="bi bi-star"></i>
    //                 (${product.rating.count})
    //             </span>
    //         </div>
    //         <button id="buy-btn" class="btn btn-primary mt-4" onclick="${() => {execute()}}">Buy Now</button>
    //     </div>
    // `
    const img = document.createElement('img');
    img.setAttribute("class", "col-md-3 col-sm-6 col img-fluid");
    img.src = product.image;
    row.appendChild(img);
    const infoContainer = document.createElement('div');
    infoContainer.setAttribute("class", "col");
    row.appendChild(infoContainer);
    const title = document.createElement('h2');
    title.textContent = product.title;
    infoContainer.appendChild(title);
    const description = document.createElement('p');
    description.textContent = product.description;
    infoContainer.appendChild(description);
    const price = document.createElement('span');
    price.setAttribute("class", "text-danger");
    price.textContent = `$${product.price}`;
    infoContainer.appendChild(price);
    const ratingContainer = document.createElement('div');
    ratingContainer.setAttribute("class", "d-flex mb-4");
    infoContainer.appendChild(ratingContainer);
    for (let j = 0; j < 5; j++) {
        const filledStar = document.createElement("i");
        filledStar.setAttribute("class", "bi bi-star-fill text-warning");
        const emptyStar = document.createElement("i");
        emptyStar.setAttribute("class", "bi bi-star");
        if (j < Math.floor(product.rating.rate)) {
            ratingContainer.appendChild(filledStar);
        }
        else {
            ratingContainer.appendChild(emptyStar);
        }
    }
    const count = document.createElement('span');
    count.textContent = `(${product.rating.count})`;
    ratingContainer.appendChild(count);
    const button = document.createElement('button');
    button.setAttribute("class", "btn btn-primary mt-auto");
    button.setAttribute("id", product.id.toString());
    button.addEventListener("click", (event) => {
        handleClick(event);
    });
    button.textContent = "Add to cart";
    infoContainer.appendChild(button);
    productContainer === null || productContainer === void 0 ? void 0 : productContainer.appendChild(row);
}
