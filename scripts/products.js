document.addEventListener("DOMContentLoaded", () => {
    const productContainer = document.getElementById('product-container');
    console.log("Product container:", productContainer);

    if (!productContainer) {
        console.error("No se encontró el contenedor de productos en el DOM.");
        return; // Termina la ejecución si no encuentra el contenedor
    }
    console.log("Product container:", productContainer);
    listProducts(productContainer); // Pasa el contenedor como argumento
});

const productContainer = document.getElementById('product-container');
console.log("Product container:", productContainer);
function listProducts(productContainer) {

    fetch('./data/products.json')
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
                        <button type="button" 
                            class="btn-plus" 
                            data-id="${product.id}" 
                            data-name="${product.name}" 
                            data-description="${product.description}">+
                        </button>
                        <button type="button" class="btn-in" data-id="${product.id}" data-name="${product.name}" data-price ="${product.price}" onclick="addProduct(event)" >Comprar</button>
                    </div>
                </div>
                `;
                productContainer.innerHTML += productCard;
                
            });
            
            // Asignar eventos al botón "+" para abrir el modal
            const plusButtons = document.querySelectorAll(".btn-plus");
            plusButtons.forEach((button) => {
                button.addEventListener("click", (event) => {
                    const productName = event.target.getAttribute('data-name');
                    const productDescription = event.target.getAttribute('data-description');
                    ;

                    // Mostrar el modal con la información del producto
                    const modal = document.getElementById("modal-desc");
                    const modalHeader = document.getElementById("modal-header");
                    const modalBody = document.getElementById("modal-body");
                    const modalFooter = document.getElementById("modal-footer");

                    // Comprobar si los datos se están pasando correctamente
                    console.log("Modal Data:", productName, productDescription);

                    modalHeader.innerHTML =  `<h2>${productName}</h2>`;
                    modalBody.innerHTML =`
                        <p> ${productDescription}</p>
                    `;

                    modal.style.display = "block"; // Muestra el modal
                });
            });
        })
        .catch((error) => {
            console.error('Hubo un error:', error);
            productContainer.innerHTML = '<p>No se pudo cargar el catálogo de productos</p>';
        });
}


// Cerrar el modal
const closeModalButton = document.getElementById("close-modal");
closeModalButton.addEventListener("click", () => {
    const modal = document.getElementById("modal-desc");
    modal.style.display = "none";
});

