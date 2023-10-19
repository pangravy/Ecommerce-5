export async function getAllProducts() : Promise<Product[]> {
    let response;
    try {
        response = await fetch('https://fakestoreapi.com/products');
        let products : Product[] = await response.json();
        return products;
    } catch(error) {
        throw error;
    }
}

export async function getProductById(id: number) : Promise<Product> {
    let response;
    try {
        response = await fetch(`https://fakestoreapi.com/products/${id}`);
        let product : Product = await response.json();
        return product;
    } catch(error) {
        throw error;
    }
}

export async function getAllProductsInCategory(category: string) : Promise<Product[]> {
    let response;
    try {
        response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
        let products : Product[] = await response.json();
        return products;
    } catch(error) {
        throw error;
    }
}