
const shopContent = document.getElementById("shopContent");
window.cart = [];

// Cuando el navegador carga products.js, ahí se define el arreglo (por ejemplo, const productos = [...]).
//Luego, cuando se carga index.js, ese arreglo ya existe en el contexto global de JavaScript, 
// así que puedes usarlo directamente en index.js.

products.forEach((product) => {
    const content = document.createElement("div"); // aqui estamos creando un div para cada producto y guardandolo en la variable content
    content.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p>Price: $${product.price}</p>
    <p>Quantity: ${product.quantity}</p>
    `;
    shopContent.appendChild(content);

    const buyButton = document.createElement("button");
    buyButton.innerText = "Comprar";

    content.append(buyButton);

    buyButton.addEventListener("click", () =>{
        cart.push({ //push hace que el producto se agregue al carrito
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: product.quantity,
            image: product.image
        });
        console.log(cart);
    });
});