// Actualizar la cantidad en la navbar
function updateCartCount() {
    var cart = JSON.parse(localStorage.getItem("cart")) || [];
    var cartCount = document.querySelector("#cart-count");
    if (!cartCount) {
        console.error("El elemento #cart-count no se encontró en el DOM.");
        return;
    }
    var totalQuantity = cart.reduce((sum, product) => sum + product.quantity, 0);
    cartCount.textContent = `(${totalQuantity})`;
}

//Agregar un producto al carrito
function addProduct(event) {
    var product = {
        id: event.target.getAttribute('data-id'),
        name: event.target.dataset.name,
        price: parseFloat(event.target.dataset.price),
        quantity: 1 
    };
    console.log("Producto agregado:", product); // Verifica los datos
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    var existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        // Incrementar la cantidad si ya existe
        existingProduct.quantity += 1;
    } else {
        // Si no existe, agregar el producto
        cart.push(product);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
    updateCartCount();
}

//Eliminar un producto del carrito

function deleteProduct(idProduct) {
    var cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(function(product) {
        return product.id !== idProduct;
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart(); 
    updateCartCount();
    updateButtonState();
}

//Vaciar el carrito
function clearCart() {
    console.log("Ejecutando clearCart...");
    localStorage.removeItem("cart"); // Elimina el carrito del localStorage
    var cart = JSON.parse(localStorage.getItem("cart")); // Verificar si se eliminó
    console.log("Carrito después de eliminar:", cart); // Esto debería mostrar null o undefined
    updateCart(); // Actualiza la lista visible del carrito
    updateCartCount(); // Actualiza el contador en la navbar
    updateButtonState();
}

//Actualizar el carrito
function updateCart() {
    var cart = JSON.parse(localStorage.getItem("cart")) || [];
    var cartList = document.getElementById("cart-list");
    if (!cartList) return;
    cartList.innerHTML = "";

    cart.forEach(function(product) {
        var li = document.createElement("li");
        li.classList.add("product-item");

        var productContainer = document.createElement("div");
        productContainer.classList.add("product-container");
        
        var nameElement = document.createElement('p');
        nameElement.textContent = `Vestido: ${product.name}`;
        nameElement.classList.add("product-name");

        var quantityElement = document.createElement('p');
        quantityElement.textContent = `Cantidad: ${product.quantity}`;
        quantityElement.classList.add("product-quantity");

        var priceElement = document.createElement('p');
        priceElement.textContent = `Precio: ${product.price.toFixed(2)}`;
        priceElement.classList.add("product-price");
        
           
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.classList.add("btn-delete");
        deleteButton.addEventListener("click", function(){
            deleteProduct(product.id);
        });
        
        //Agrego los elementos al contenedor de productos
        productContainer.appendChild(nameElement);
        productContainer.appendChild(quantityElement);
        productContainer.appendChild(priceElement);
        productContainer.appendChild(deleteButton);

        //Agrego el contenedor a la lista
        li.appendChild(productContainer);

        //Agrego la lista al carrito
        cartList.appendChild(li);

    });
   // Muestro el total de productos y el total a pagar
    var totalProd = document.querySelector(".total-prod");    
    var totalElement = document.querySelector(".total");
    var totalQuantity = cart.reduce((sum, product) => sum + product.quantity, 0);
    var totalPrice = cart.reduce((sum, product) => sum + product.price * product.quantity,
    0);
    if (totalProd) totalProd.textContent = `Cantidad de productos en el carrito: ${totalQuantity}`;
    if (totalElement) totalElement.textContent = `Total a pagar: $${totalPrice.toFixed(2)}`;
    } 
  
document.addEventListener("DOMContentLoaded", function () {
    updateCart();
    updateCartCount();
    updateButtonState();
   
});

//Función para habilitar/deshabilitar el botón que abre el modal
function updateButtonState() {
    var cart = JSON.parse(localStorage.getItem("cart")) || [];
    var chkBtn = document.querySelector("#checkout-btn");

    if (cart.length > 0) {
        // Si hay productos en el carrito, habilitar el botón
        chkBtn.disabled = false;
    } else {
        // Si el carrito está vacío, deshabilitar el botón
        chkBtn.disabled = true;
    }
}

// Modal 
var modal = document.getElementById("payment-modal");
var btn = document.getElementById("checkout-btn");
var payment = document.getElementById("payment-btn");

// Función para verificar si los campos están completos
function validatePaymentForm() {
    var requiredFields = ["name", "email", "cardNumber", "cardHolder", "expiryDate", "cvv"];
    var isValid = requiredFields.every(id => {
        var field = document.getElementById(id);
        return field && field.value.trim() !== "";
    });

    payment.disabled = !isValid;
}
// Abro el modal al clickear en el botón checkout
btn.onclick = function () {
    modal.style.display = "block";

    // Restablecer el estado inicial del botón de pago
    validatePaymentForm();

    // Escuchar los cambios en los campos del formulario
    var paymentForm = document.getElementById("payment-form");
    paymentForm?.addEventListener("input", validatePaymentForm);
};

// Al clickear pagar cierro el modal y vacío el carrito
payment.onclick = function (event) {
    

    // Mostrar mensaje de agradecimiento
    var modalContent = document.querySelector(".modal-content");
    modalContent.innerHTML = "<h2>¡Gracias por su compra!</h2>";

    // Cerrar el modal después de 2 segundos
    setTimeout(() => {
        modal.style.display = "none"; // Cierra el modal
        clearCart(); // Vacía el carrito solo después de cerrar el modal

        // Reinicia el contenido del modal
        modalContent.innerHTML = `
            <div class="modal-header">
                <h2>Modal Header</h2>
            </div>
             <div>
                <label for="name">Nombre y apellido:</label>
                <input type="text" id="name" name="name" required>
            </div>
            <div>
                <label for="emal">Email:</label>
                <input type="text" id="email" name="email" required>
            </div>
            <h3>Datos de la tarjeta</h3>
            <form id="payment-form">
                <div class="form-group">
                    <label for="name">Nombre completo</label>
                    <input type="text" id="name" placeholder="Tu nombre" required>
                </div>
                <div class="form-group">
                    <label for="email">Correo electrónico</label>
                    <input type="email" id="email" placeholder="Tu correo" required>
                </div>
                <div class="form-group">
                    <label for="cardNumber">Número de tarjeta</label>
                    <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" required>
                </div>
                <div class="form-group">
                    <label for="cardHolder">Titular de la tarjeta</label>
                    <input type="text" id="cardHolder" placeholder="Nombre del titular" required>
                </div>
                <div class="form-group">
                    <label for="expiryDate">Fecha de expiración</label>
                    <input type="text" id="expiryDate" placeholder="MM/AA" required>
                </div>
                <div class="form-group">
                    <label for="cvv">CVV</label>
                    <input type="text" id="cvv" placeholder="123" required>
                </div>
                <button id="payment-btn">Pagar</button>
            </form>
            <div class="modal-footer">
                <h3>Modal Footer</h3>
            </div>
        `;
    }, 2000);
};

