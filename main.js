

const footer = document.getElementById('footer');
const cart = [];


const productList = [];

productList.push({
    name: 'Ref. 2057',
    price: 35000,
    image: './imagenes/IMG_20230917_175317.jpg'
});

productList.push({
    name: 'Ref. 2155',
    price: 39000,
    image: './imagenes/IMG_20230917_175502.jpg'
});

productList.push({
    name: 'Ref. 2058',
    price: 28000,
    image: './imagenes/IMG_20230917_180125.jpg'
});

productList.push({
    name: 'Ref. 2255',
    price: 40000,
    image: './imagenes/IMG_20230917_175953.jpg'
});

productList.push({
    name: 'Ref. 2256',
    price: 45000,
    image: './imagenes/IMG_20230917_180434.jpg'
});

productList.push({
    name: 'Ref. 2156',
    price: 40000,
    image: './imagenes/IMG_20230917_180619.jpg'
});

productList.push({
    name: 'Ref. 2059',
    price: 40000,
    image: './imagenes/IMG_20230917_180302.jpg'
});

productList.push({
    name: 'Ref. 2257',
    price: 40000,
    image: './imagenes/IMG_20230917_175752.jpg'
});


function renderProducts(arr) {
for (let i = 0; i < productList.length; i++) {

const row = document.getElementById('row');
// Crear el elemento <div> con la clase "col mb-5"
const col = document.createElement("div");
col.className = "col mb-5 products";

// Crear el elemento <div> con la clase "card h-100"
const card = document.createElement("div");
card.className = "card h-100";

// Crear la imagen del producto
const productImage = document.createElement("img");
productImage.setAttribute('src', productList[i].image);
productImage.className = "card-img-top";
productImage.alt = "...";

// Crear el cuerpo de la tarjeta
const cardBody = document.createElement("div");
cardBody.className = "card-body p-4";

// Crear el título del producto
const productName = document.createElement("h5");
productName.className = "fw-bolder";
productName.textContent = "Sale item";

// Crear el número de referencia
const productRef = document.createElement("h6");
productRef.innerText = productList[i].name;
productRef.className = "card-title";


// Crear el precio del producto
const productPrice = document.createElement("span");
productPrice.innerText = '$' + productList[i].price;
productPrice.className = "card-price";


// Crear el pie de la tarjeta
const cardFooter = document.createElement("div");
cardFooter.className = "card-footer p-4 pt-0 border-top-0 bg-transparent";

// Crear el botón "Add to cart"
const addToCartButton = document.createElement("button");
addToCartButton.className = "btn btn-outline-danger mt-auto addToCart";
addToCartButton.textContent = "Add to cart";
addToCartButton.addEventListener("click", () => {
// Agregar el producto al carrito
    const productToAdd = {
    name: productList[i].name,
    price: productList[i].price,
    image: productList[i].image,
    };

cart.push(productToAdd);

// Actualizar el contador del carrito
const cartItemCount = document.querySelector(".badge.bg-danger.text-white.ms-1.rounded-pill");
cartItemCount.textContent = cart.length;

// Actualizar el carrito
updateCart();
});

// ... (Agregar el botón "Agregar al carrito" al pie de la tarjeta)
function updateCart() {
    const cartList = document.getElementById("cart-list");
    const totalPriceElement = document.getElementById("total-price");
    const cartCountElement = document.getElementById('cart-count'); //elemento para el contador
    const cartContainer = document.querySelector('.cart-container'); //agrega una clase a tu contenedor  de carrito

    // Limpiar el carrito antes de actualizar
    cartList.innerHTML = "";

    // Calcular el precio total
    let totalPrice = 0;

    //verificar si hay elementos en el carrito
    if (cart.length === 0) {
        cartContainer.style.display = 'none'; //ocultar el carrito si esta vacio
    } else {
        cartContainer.style.display = 'block'; //Mostrar carrito si hay elementos

        // Iterar sobre los productos en el carrito
        for (let i = 0; i < cart.length; i++) {
            const product = cart[i];

            // Crear un elemento de lista para el producto en el carrito
            const cartItem = document.createElement('li');
            cartItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}" width="50" height="50">
                <span>${product.name}</span>
                <span class="cart-price">$${product.price.toFixed(2)}</span>
                <button class="remove-from-cart btn btn-danger btn-sm" data-index="${i}">Remove</button>
            `;

            // Manejar la eliminación del producto del carrito
            const removeButton = cartItem.querySelector(".remove-from-cart");
            removeButton.addEventListener("click", () => {
                cart.splice(i, 1);
                updateCart();
                updateCartCount(); //llama la función para actualizar el contador
            });

            // Agregar el elemento de lista al carrito
            cartList.appendChild(cartItem);

            // Sumar al precio total
            totalPrice += product.price;
        }
    }

    // Actualizar el precio total en el carrito
    totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
}
   
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = cart.length; //actualiza el contador con la longitud del carrito
}


const buyButton = document.querySelector(".btn-pay");
buyButton.addEventListener("click", () => {
    // Aquí puedes implementar la lógica para finalizar la compra,
    // como enviar los productos seleccionados al servidor o mostrar un mensaje de éxito.
    alert("Compra realizada. Funcionalidad de pago real no implementada.");
});

// Agregar todos los elementos en el orden correcto
cardBody.appendChild(productName);
cardBody.appendChild(productRef);
cardBody.appendChild(productPrice);

cardFooter.appendChild(addToCartButton);

card.appendChild(productImage);
card.appendChild(cardBody);
card.appendChild(cardFooter);

col.appendChild(card);
row.appendChild(col);


    }
}

renderProducts(productList);
updateCartCount();


