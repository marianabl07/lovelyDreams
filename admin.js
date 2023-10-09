const inventoryList = document.getElementById("inventory-list");
        const cartList = document.getElementById("cart-list");
        const totalPriceElement = document.getElementById("total-price");
        let totalPrice = 0;

        // Objeto para llevar un registro de la cantidad de productos en el carrito
        const cartProducts = {};

        // Función para actualizar la cantidad de productos en el carrito
        function updateCart(productName, change) {
            if (cartProducts[productName] === undefined) {
                cartProducts[productName] = 0;
            }

            const inventoryItem = Array.from(inventoryList.children).find(item =>
                item.querySelector(".product-name").textContent === productName);

            if (inventoryItem) {
                const productQuantityElement = inventoryItem.querySelector(".product-quantity");
                const productQuantity = parseInt(productQuantityElement.textContent);

                if (change < 0 && cartProducts[productName] + change < 0) {
                    // Si el cambio es negativo y llevaría a una cantidad negativa en el carrito, establece la cantidad en 0
                    change = -cartProducts[productName];
                }

                if (productQuantity + cartProducts[productName] + change >= 0) {
                    // Actualiza la cantidad en el carrito y en el objeto cartProducts
                    cartProducts[productName] += change;

                    // Actualiza la cantidad disponible en el inventario
                    productQuantityElement.textContent = `${productQuantity - change} available`;

                    // Verifica si el inventario llega a 0 y deshabilita el botón "Add to cart"
                    if (productQuantity - change === 0) {
                        inventoryItem.querySelector(".add-to-cart").setAttribute("disabled", "disabled");
                    }

                    // Actualiza la lista del carrito
                    updateCartList();
                } else {
                    alert("There is not enough quantity available.");
                }
            }
        }

        // Función para actualizar la lista del carrito
        function updateCartList() {
            // Limpia la lista del carrito
            cartList.innerHTML = "";
            totalPrice = 0;

            // Itera a través de los productos en el carrito
            for (const productName in cartProducts) {
                const productQuantity = cartProducts[productName];
                const inventoryItem = Array.from(inventoryList.children).find(item =>
                    item.querySelector(".product-name").textContent === productName);

                if (inventoryItem) {
                    const productPrice = inventoryItem.querySelector(".product-price").textContent;
                    const productImage = inventoryItem.querySelector("img").src;

                    // Agrega el producto al carrito en la lista
                    const cartItem = document.createElement("li");
                    cartItem.textContent = `${productName} (Quantity: ${productQuantity})`;

                    // Agrega el botón "Remove from cart"
                    const removeButton = document.createElement("button");
                    removeButton.textContent = "Remove from cart";
                    removeButton.className = "remove-from-cart";
                    removeButton.addEventListener("click", () => {
                        updateCart(productName, -1);
                    });

                    cartItem.appendChild(removeButton);
                    cartList.appendChild(cartItem);

                    // Agrega la imagen del producto al carrito
                    const productImageElement = document.createElement("img");
                    productImageElement.src = productImage;
                    cartItem.appendChild(productImageElement);

                    // Calcula el precio del producto y actualiza el total
                    totalPrice += parseFloat(productPrice.replace("$", "")) * productQuantity;
                }
            }

            // Actualiza el precio total
            totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
        }

        // Agrega manejadores de eventos para los botones "Add to cart" y "Remove from cart"
        const addToCartButtons = document.querySelectorAll(".add-to-cart");
        addToCartButtons.forEach(button => {
            button.addEventListener("click", () => {
                const productName = button.parentNode.querySelector(".product-name").textContent;
                updateCart(productName, 1);
            });
        });

        const removeFromCartButtons = document.querySelectorAll(".remove-from-cart");
        removeFromCartButtons.forEach(button => {
            button.addEventListener("click", () => {
                const productName = button.parentNode.querySelector(".product-name").textContent;
                updateCart(productName, -1);
            });
        });