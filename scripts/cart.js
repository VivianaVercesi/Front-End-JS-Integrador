

// Actualizar la cantidad en la navbar
function updateCartCount() {
    var cart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log("Carrito actual:", cart); // Verificar contenido del carrito
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
    updateButtonState();
}

//Eliminar un producto del carrito

function deleteProduct(idProduct) {
    var cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Buscar el producto en el carrito
    var existingProduct = cart.find(product => product.id === idProduct);
    
    if (existingProduct) {
        if (existingProduct.quantity > 1) {
            // Si la cantidad es mayor a 1, reducir la cantidad
            existingProduct.quantity -= 1;
        } else {
            // Si la cantidad es 1, eliminar el producto del carrito
            cart = cart.filter(product => product.id !== idProduct);
        }
        
        // Guardar el carrito actualizado en el localStorage
        localStorage.setItem("cart", JSON.stringify(cart));
        
        // Actualizar la interfaz
        updateCart();
        updateCartCount();
        updateButtonState();
    }
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
    console.log("Productos en el carrito:", cart);
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
    //updateButtonState();
   
});


document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("checkout-btn"); 
    if (button) {
        button.onclick = () => {
            console.log("Botón clickeado");
        };
    } else {
        console.error("El botón no existe en el DOM.");
    }
});

// Modal 
const modal = document.getElementById("payment-modal");
const checkoutBtn = document.getElementById("checkout-btn");
const paymentBtn = document.getElementById("payment-btn");

if (!checkoutBtn) {
    console.error("El botón 'checkout-btn' no se encontró en el DOM.");
}

// Abro el modal al clickear en el botón checkout
checkoutBtn.addEventListener("click", (event) => {
    const countElement = document.getElementById("cart-count"); 
    const countText = countElement?.innerText.trim();
    console.log("Contenido original de #cart-count:", countText);
    const cleanedText = countText.replace(/[^\d]/g, "");
    const count = Number(cleanedText);

    if (isNaN(isNaN(count) || cleanedText === "")) {
        console.error("El valor de 'cart-count' no es un número válido:", countText);
        alert("Hubo un error al verificar el carrito. Inténtalo de nuevo.");
        return;
    }

    // Verificar si el carrito tiene elementos
    if (count > 0) {
        modal.style.display = "block"; // Muestra el modal
        console.log("cant", count);
    } else {
        alert("El carrito está vacío. Agrega productos antes de proceder al pago."); // Muestra un mensaje
    }
       

    // Escuchar los cambios en los campos del formulario
    var paymentForm = document.getElementById("payment-form");
    
});


// Al clickear pagar cierro el modal y vacío el carrito
paymentBtn.addEventListener("click",(event) => {
    // Mostrar mensaje de agradecimiento
    console.log("paymentBtn clickeado");
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
})


//Validaciones

const paymentForm = document.getElementById('payment-modal');
const inputs = document.querySelectorAll('#payment-modal input');

const expressions = {
    name: /^[a-zA-ZÁ-ÿ\s]{1,48}$/,
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    cardNumber: /^\d{16}$/,
    cardHolder: /^[a-zA-ZÁ-ÿ\s]{1,48}$/,
    expiryDate: /^(0[1-9]|1[0-2])\/\d{2}$/,
    cvv: /^\d{3}$/,

}

// Estado de los campos del formulario
const fields = {
    name: false,
    email: false,
    cardNumber: false,
    cardHolder: false,
    expiryDate: false,
    cvv: false,
};

// Validar campo individual
const validateField = (expression, input, field) => {
    if (expression.test(input.value)) {
        input.classList.remove('inputNotOk');
        input.classList.add('inputOk');
        fields[field] = true;
    } else {
        input.classList.add('inputNotOk');
        input.classList.remove('inputOk');
        fields[field] = false;
    }
    checkFormValidity(); // Verificar si todo el formulario es válido
};

// Verificar si todos los campos son válidos
const checkFormValidity = () => {
    const allValid = Object.values(fields).every(value => value === true);
    paymentBtn.disabled = !allValid; // Habilitar o deshabilitar el botón
    
};

// Escuchar eventos en los inputs
inputs.forEach(input => {
    input.addEventListener('keyup', (e) => {
        validateField(expressions[e.target.name], e.target, e.target.name);
    });
    input.addEventListener('blur', (e) => {
        validateField(expressions[e.target.name], e.target, e.target.name);
    });
});

// Función para borrar los datos del formulario
function clearFormData() {
    var formFields = ["name", "email", "cardNumber", "cardHolder", "expiryDate", "cvv"];
    formFields.forEach(function(fieldId) {
        var field = document.getElementById(fieldId);
        if (field) {
            field.value = ''; // Limpiar los campos
        }
    });
}

// Obtener el botón de "Cerrar y Borrar Datos" y agregar el evento
var clearDataBtn = document.getElementById("cancel-btn");
clearDataBtn.addEventListener("click", function() {
    clearFormData(); // Limpiar los campos
    modal.style.display = "none"; // Cerrar el modal
});

// Inicializar el botón como deshabilitado
document.addEventListener('DOMContentLoaded', () => {
    paymentBtn.disabled = true;
});



