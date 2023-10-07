
const inventoryList = document.getElementById("inventory-list");
const cartList = document.getElementById("cart-list");
const totalPriceElement = document.getElementById("total-price");
let totalPrice = 0;

// Función para agregar un producto al carrito
function addToCart(productName, productPrice, productImage) {
    const inventoryItem = Array.from(inventoryList.children).find(item =>
    item.querySelector(".product-name").textContent === productName);

    if (inventoryItem) {
        const productQuantityElement = inventoryItem.querySelector(".product-quantity");
        const productQuantity = parseInt(productQuantityElement.textContent);

    if (productQuantity > 0) {
    // Reduce la cantidad disponible
        productQuantityElement.textContent = `${productQuantity - 1} available`;

        // Agrega el producto al carrito
        const cartItem = document.createElement("li");
        cartItem.textContent = productName;
        cartList.appendChild(cartItem);

        // Agrega la imagen del producto al carrito
        const productImageElement = document.createElement("img");
        productImageElement.src = productImage;
        cartItem.appendChild(productImageElement);

        // Calcula el precio del producto
        totalPrice += parseFloat(productPrice.replace("$", ""));
        totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;

        // Agrega un botón para eliminar el producto del carrito
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove from cart";
        removeButton.addEventListener("click", () => {
        // Aumenta la cantidad disponible al eliminar del carrito
        productQuantityElement.textContent = `${productQuantity + 1} available`;
        // Elimina el producto del carrito
        cartList.removeChild(cartItem);
                        
        // Resta el precio del producto eliminado del total
        totalPrice -= parseFloat(productPrice.replace("$", ""));
        totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
        });
        cartItem.appendChild(removeButton);
        } else {
                alert("No hay suficiente cantidad disponible.");
            }
        }
    }

    // Agrega manejadores de eventos para los botones "Add to cart"
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", () => {
            const productName = button.parentNode.querySelector(".product-name").textContent;
            const productPrice = button.parentNode.querySelector(".product-price").textContent;
            const productImage = button.parentNode.querySelector("img").src;
            addToCart(productName, productPrice, productImage);
        });
});