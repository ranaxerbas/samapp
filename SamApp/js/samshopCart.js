import api from "./api.service.js"
document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-container");
    const cartTotal = document.getElementById("cart-total");

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Je winkelmand is leeg.</p>";
        return;
    }

    let totalPrice = 0;

    cartContainer.innerHTML = cart.map(item => {
        const itemTotal = item.quantity * item.price;
        totalPrice += itemTotal;
        return `
          <div class="shop-item">
            <div class="shop-item-image">
              <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="shop-item-content">
              <h3>${item.title}</h3>
              <p>Aantal: ${item.quantity}</p>
              <p>Prijs: ${item.priceFormatted}</p>
              <button class="remove-button" data-id="${item.id}">Verwijder</button>
            </div>
          </div>
        `;
    }).join("");

    cartTotal.innerHTML = `<h3>Totaalbedrag: €${totalPrice.toFixed(2)}</h3>`;

    document.querySelectorAll('.remove-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            const updatedCart = cart.filter(item => item.id !== id);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            location.reload();
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartTotal = document.getElementById("cart-total");
    const cartContainer = document.getElementById("cart-container");


    function saveCartAndReload() {
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }

    function renderCart() {
        cart = JSON.parse(localStorage.getItem("cart")) || [];
        cartContainer.innerHTML = "";
        cartTotal.innerHTML = "";

        if (cart.length === 0) {
            cartContainer.innerHTML = "<p>Je winkelmand is leeg.</p>";
            document.getElementById("cart-actions").style.display = "none";
            return;
        } else {
            document.getElementById("cart-actions").style.display = "block";
        }

        let totalPrice = 0;

        cart.forEach(item => {
            const itemTotal = item.quantity * item.price;
            totalPrice += itemTotal;

            const itemDiv = document.createElement('div');
            itemDiv.className = 'shop-item';

            const imageDiv = document.createElement('div');
            imageDiv.className = 'shop-item-image';
            const img = document.createElement('img');
            img.src = item.image;
            img.alt = item.title;
            imageDiv.appendChild(img);

            const contentDiv = document.createElement('div');
            contentDiv.className = 'shop-item-content';

            const title = document.createElement('h3');
            title.textContent = item.title;

            const quantityText = document.createElement('p');
            quantityText.textContent = `Aantal: ${item.quantity}`;

            const price = document.createElement('p');
            price.textContent = `Prijs: ${item.priceFormatted}`;

            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-button';
            removeBtn.textContent = 'Verwijder';
            removeBtn.addEventListener('click', () => {
                cart = cart.filter(cartItem => cartItem.id !== item.id);
                saveCartAndReload();
            });

            const quantityDiv = document.createElement('div');
            quantityDiv.className = 'quantity-buttons';

            const minusBtn = document.createElement('button');
            minusBtn.textContent = '-';
            minusBtn.addEventListener('click', () => {
                if (item.quantity > 1) {
                    item.quantity--;
                    saveCartAndReload();
                }
            });

            const quantityDisplay = document.createElement('span');
            quantityDisplay.textContent = item.quantity;

            const plusBtn = document.createElement('button');
            plusBtn.textContent = '+';
            plusBtn.addEventListener('click', () => {
                item.quantity++;
                saveCartAndReload();
            });

            quantityDiv.appendChild(minusBtn);
            quantityDiv.appendChild(quantityDisplay);
            quantityDiv.appendChild(plusBtn);

            contentDiv.appendChild(title);
            contentDiv.appendChild(quantityText);
            contentDiv.appendChild(price);
            contentDiv.appendChild(quantityDiv);
            contentDiv.appendChild(removeBtn);

            itemDiv.appendChild(imageDiv);
            itemDiv.appendChild(contentDiv);
            cartContainer.appendChild(itemDiv);
        });

        cartTotal.innerHTML = `<h3>Totaalbedrag: €${totalPrice.toFixed(2)}</h3>`;
    }

    function showMessage(text, redirectUrl = null) {
        const message = document.getElementById('cart-message');
        if (!message) return;

        message.textContent = text;
        message.classList.remove('hidden');
        message.classList.add('show');

        setTimeout(() => {
            message.classList.remove('show');
            message.classList.add('hidden');

            if (redirectUrl) {
                window.location.href = redirectUrl;
            }
        }, 500);
    }

    const checkoutButton = document.getElementById("checkout-button");

    checkoutButton.addEventListener('click', async () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const previousOrders = JSON.parse(localStorage.getItem("orders")) || [];

        const response = await api.userGet();
        const user = Array.isArray(response.data) ? response.data[0] : response.data;

        console.log("user "+user.Id)
        const customerId = user.Id;
        const orderDate = new Date().toISOString();

        const productDictionary = {};

        cart.forEach(item => {
            const productPath = item.title ;
            const quantity = item.quantity

            if (!productDictionary[productPath]) {
                productDictionary[productPath] = [];
            }


                productDictionary[productPath].push({
                    productId: item.id,
                    quantity: quantity})


        });

        previousOrders.push({
            date: orderDate,
            items: cart
        });
        localStorage.setItem("orders", JSON.stringify(previousOrders));
        localStorage.removeItem("cart");

        try {
            await api.CreateOrder(customerId, orderDate, productDictionary);
        } catch (error) {
            console.error("Order API failed:", error);
        }

        showMessage("Bedankt voor je bestelling!", "profiel.html");
    });

    renderCart();
});
