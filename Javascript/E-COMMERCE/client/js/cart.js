const modalContainer = document.getElementById("modal-container");
const modalOverlay = document.getElementById("modal-overlay");
const cartBtn = document.getElementById("cart-btn");
const cartCounter = document.getElementById("cart-counter");

const displayCart = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "block";
    modalOverlay.style.display = "block";

    // Modal header
    const modalHeader = document.createElement("div");
    const modalClose = document.createElement("div");
    modalClose.innerText = "❌";
    modalClose.className = "modal-close";
    modalHeader.append(modalClose);

    modalClose.addEventListener("click", () => {
        modalContainer.style.display = "none";
        modalOverlay.style.display = "none";
    }); 

    const modalTitle = document.createElement("div");
    modalTitle.innerText = "Cart";
    modalTitle.className = "modal-title";
    modalHeader.append(modalTitle);
    modalContainer.append(modalHeader);

    if (cart.length > 0) {
        // Crear contenido del carrito
        cart.forEach((product) => {
            const modalBody = document.createElement("div");
            modalBody.className = "modal-body";
            modalBody.innerHTML = `
            <div class="product">
                <img class="product-img" src="${product.image}" />
                <div class="product-info">
                    <h4>${product.name}</h4>
                </div>
                <div class="quantity">
                    <span class="quantity-btn-decrease">-</span>
                    <span class="quantity-input">${product.quantity}</span>
                    <span class="quantity-btn-increase">+</span>
                </div>
                <div class="price">${product.price * product.quantity}</div>
                <div class="delete-product">❌</div>
            </div>
            `;
            modalContainer.append(modalBody);

            // Event listeners para cada producto
            const decrease = modalBody.querySelector(".quantity-btn-decrease");
            decrease.addEventListener("click", () => {
                if (product.quantity > 1) {
                    product.quantity--;
                    displayCart();
                    displayCartCounter();
                }
            });

            const increase = modalBody.querySelector(".quantity-btn-increase");
            increase.addEventListener("click", () => {
                if (product.quantity < product.stock) { 
                    product.quantity++;
                    displayCart();
                    displayCartCounter();
                }    
            });

            const deleteProduct = modalBody.querySelector(".delete-product");
            deleteProduct.addEventListener("click", () => {
                deleteCartProduct(product.id);
                displayCartCounter();
            });
        });

        // Modal footer 
        const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const modalFooter = document.createElement("div");
        modalFooter.className = "modal-footer";
        modalFooter.innerHTML = `
            <div class="total-price">Total: ${total}</div>
            <button class="btn-primary" id="checkout-btn">Go to checkout</button>
            <div id="button-checkout"></div>
        `;
        modalContainer.append(modalFooter);

        // MercadoPago - usar la clave pública desde mp_config.js (o fallback)
        const publicKey = window.MP_PUBLIC_KEY || "APP_USR-025ecd02-a292-48f9-b43b-e09b3cbde477";
        const mercadopago = new MercadoPago(publicKey, {
            locale: "es-AR",
        });

        // Event listener 
        const checkoutButton = modalFooter.querySelector("#checkout-btn");
        checkoutButton.addEventListener("click", async () => {
            checkoutButton.remove();

            const ordenData = {
                description: "Compra de Ecommerce",
                price: total,
                quantity: 1,
            };

            fetch("/create_preference", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(ordenData),
            })
            .then(function (response) {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(function (preference) {
                console.log('Preferencia recibida:', preference);
                if (preference.id) {
                    // Asegurar que exista el contenedor antes de renderizar
                    if (!document.getElementById('button-checkout')) {
                        console.error('No se encontró el contenedor button-checkout');
                        alert('Error interno: contenedor de pago no disponible');
                        return;
                    }
                    createCheckoutButton(preference.id, mercadopago);
                } else {
                    console.error('No se recibió ID de preferencia:', preference);
                    alert("Error: No se pudo crear la preferencia de pago");
                }
            })
            .catch(function (error) {
                console.error('Error en fetch:', error);
                alert("Error al procesar el pago: " + error.message);
            });
        });

    } else {
        const modalText = document.createElement("h2");
        modalText.className = "modal-body";
        modalText.innerText = "Your cart is empty";
        modalContainer.append(modalText);
    }
};

// 
const createCheckoutButton = (preferenceId, mercadopago) => {
    const bricksBuilder = mercadopago.bricks();
    const renderComponent = async (bricksBuilder) => {
        await bricksBuilder.create("wallet", "button-checkout", {
            initialization: {
                preferenceId: preferenceId,
            },
            callbacks: {
                onError: (error) => { console.error("Error in Wallet brick: ", error); },
                onReady: () => { console.log("Wallet brick is ready"); },
            },
        }); 
    };
    renderComponent(bricksBuilder);
}

cartBtn.addEventListener("click", displayCart);

const deleteCartProduct = (id) => {
    const foundId = cart.findIndex((prod) => prod.id === id);
    cart.splice(foundId, 1);
    displayCart();
    displayCartCounter();
};

const displayCartCounter = () => {
    const cartLength = cart.reduce((acc, el) => acc + el.quantity, 0);
    if(cartLength > 0){
        cartCounter.style.display = "block";
        cartCounter.innerText = cartLength;
    }else{
        cartCounter.style.display = "none";
    }
};
