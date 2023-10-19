export function appendProductCards(parentDivId: string, products: Product[]) {
    const container = document.getElementById(parentDivId);

    const navToProductPage = (event: Event) => {
        const target = event.target as HTMLElement;
        if (target.id != parentDivId && target.parentElement?.id != undefined && (/^[0-9]*$/.test(target.parentElement?.id))) {
            localStorage.setItem("selectedProduct", target.parentElement?.id.toString());
            location.assign("productPage.html");
        }
    }

    container?.addEventListener("click", navToProductPage);

    for (let i = 0; i < products.length; i++) {
        const card: HTMLDivElement = document.createElement('div');
        card.setAttribute("class", "card");
        card.setAttribute("id", products[i].id.toString());

        const cardBody = document.createElement('div');
        cardBody.setAttribute("class", "card-body d-flex flex-column");
        cardBody.setAttribute("id", products[i].id.toString());
        card.appendChild(cardBody);

        const img: HTMLImageElement = document.createElement('img');
        img.setAttribute("class", "card-img-top");
        img.src = products[i].image;
        cardBody.appendChild(img);

        const title: HTMLSpanElement = document.createElement('span');
        title.setAttribute("class", "fw-bold");
        title.textContent = products[i].title;
        cardBody.appendChild(title);

        const price: HTMLSpanElement = document.createElement('span');
        price.setAttribute("class", "text-danger mt-1");
        price.textContent = `$${products[i].price}`;
        cardBody.appendChild(price);

        const ratingContainer: HTMLDivElement = document.createElement('div');
        ratingContainer.setAttribute("class", "d-flex mb-4");
        cardBody.appendChild(ratingContainer);

        for (let j = 0; j < 5; j++) {
            const filledStar = document.createElement("i");
            filledStar.setAttribute("class", "bi bi-star-fill text-warning");
            const emptyStar = document.createElement("i");
            emptyStar.setAttribute("class", "bi bi-star");

            if (j < Math.floor(products[i].rating.rate)) {
                ratingContainer.appendChild(filledStar);
            } else {
                ratingContainer.appendChild(emptyStar);
            }
        }

        const count: HTMLSpanElement = document.createElement('span');
        count.textContent = `(${products[i].rating.count})`;
        ratingContainer.appendChild(count);

        const button: HTMLButtonElement = document.createElement('button');
        button.setAttribute("class", "btn btn-secondary mt-auto");
        button.textContent = "Buy Now";
        cardBody.appendChild(button);

        container?.appendChild(card);
    }
}

export function appendProductCard(parentDivId: string, product: Product, handleClick: Function) {
    const productContainer: HTMLElement | null = document.getElementById(parentDivId);
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
    const img: HTMLImageElement = document.createElement('img');
    img.setAttribute("class", "col-md-3 col-sm-6 col img-fluid");
    img.src = product.image;
    row.appendChild(img);

    const infoContainer: HTMLDivElement = document.createElement('div');
    infoContainer.setAttribute("class", "col");
    row.appendChild(infoContainer);

    const title: HTMLHeadingElement = document.createElement('h2');
    title.textContent = product.title;
    infoContainer.appendChild(title);

    const description: HTMLHeadingElement = document.createElement('p');
    description.textContent = product.description;
    infoContainer.appendChild(description);

    const price: HTMLSpanElement = document.createElement('span');
    price.setAttribute("class", "text-danger");
    price.textContent = `$${product.price}`;
    infoContainer.appendChild(price);

    const ratingContainer: HTMLDivElement = document.createElement('div');
    ratingContainer.setAttribute("class", "d-flex mb-4");
    infoContainer.appendChild(ratingContainer);

    for (let j = 0; j < 5; j++) {
        const filledStar = document.createElement("i");
        filledStar.setAttribute("class", "bi bi-star-fill text-warning");
        const emptyStar = document.createElement("i");
        emptyStar.setAttribute("class", "bi bi-star");

        if (j < Math.floor(product.rating.rate)) {
            ratingContainer.appendChild(filledStar);
        } else {
            ratingContainer.appendChild(emptyStar);
        }
    }

    const count: HTMLSpanElement = document.createElement('span');
    count.textContent = `(${product.rating.count})`;
    ratingContainer.appendChild(count);

    const button: HTMLButtonElement = document.createElement('button');
    button.setAttribute("class", "btn btn-primary mt-auto");
    button.setAttribute("id", product.id.toString());
    button.addEventListener("click", (event) => {
        handleClick(event);
    });
    button.textContent = "Add to cart";
    infoContainer.appendChild(button);

    productContainer?.appendChild(row);
}