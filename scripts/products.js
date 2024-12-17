document.addEventListener("DOMContentLoaded", () => {
    const productContainer = document.getElementById('product-container');
    console.log("Product container:", productContainer);

    if (!productContainer) {
        console.error("No se encontró el contenedor de productos en el DOM.");
        return; // Termina la ejecución si no encuentra el contenedor
    }

    listProducts(productContainer); // Pasa el contenedor como argumento
});

console.log("Product container:", productContainer);
function listProducts(productContainer) {
    const jsonURL = './data/products.json';

    fetch(jsonURL)
        .then((response) => {
            console.log("Response:", response);
            if (!response.ok) {
                throw new Error('Error al cargar el archivo json');
            }
            return response.json();
        })
        .then((products) => {
            console.log(products);
            products.forEach((product) => {
                const productCard = `
                <div class="product-card">
                    <img src="./assets/images/${product.image}" alt="foto del vestido ${product.name}" class="product-image">
                    <div class="product-details">
                        <h2>${product.name}</h2>
                        <h2>Precio: $ ${product.price}</h2>
                        <select id="size" name="size">
                            <option>Talle:</option>
                            <option value="XS">XS</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                        </select>
                        <select id="colorPicker" name="colorPicker">
                            <option>Color:</option>
                            <option value="pink" id="color1">rosa</option>
                            <option value="lilac" id="color2">lila</option>
                            <option value="violet" id="color3">violeta</option>
                            <option value="light-blue" id="color4">celeste</option>
                            <option value="blue" id="color5">azul</option>
                            <option value="black" id="color6">negro</option>
                            <option value="white" id="color7">blanco</option>
                        </select>
                        <button type="button" class="btn-in" data-id="${product.id}" data-name="${product.name}" data-price ="${product.price}" onclick="addProduct(event)" >Comprar</button>
                    </div>
                </div>
                `;
                productContainer.innerHTML += productCard;
            });
        })
        .catch((error) => {
            console.error('Hubo un error:', error);
            productContainer.innerHTML = '<p>No se pudo cargar el catálogo de productos</p>';
        });
}

