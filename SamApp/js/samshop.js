export    const shopItems = [
    { id: 1, category: 'KLEDIJ', title: 'T-SHIRT', image: '../assets/mockups/Tshirt1-blue.png', description: 'In nostrum consectetur est veniam blanditiis aut beatae deserunt est sint...', priceNew: '€39,99', priceOld: '€39,99', promo: 'PROMO 30%', price: 39.99 },
    { id: 2, category: 'KLEDIJ', title: 'SNEAKER A', image: '../assets/mockups/Sneakers1.png', description: 'In nostrum consectetur est veniam blanditiis aut beatae deserunt est sint...', priceNew: '€39,99', priceOld: '€39,99', promo: 'PROMO 30%', price: 39.99 },
    { id: 3, category: 'KLEDIJ', title: 'SNEAKER B', image: '../assets/mockups/Gympantoffels.png', description: 'In nostrum consectetur est veniam blanditiis aut beatae deserunt est sint...', priceNew: '€39,99', priceOld: '€39,99', promo: 'PROMO 30%', price: 39.99 },
    { id: 4, category: 'KLEDIJ', title: 'SHORT', image: '../assets/mockups/Short1-blue.png', description: 'In nostrum consectetur est veniam blanditiis aut beatae deserunt est sint...', priceNew: '€39,99', priceOld: '€39,99', promo: 'PROMO 30%', price: 39.99 },
    { id: 5, category: 'KLEDIJ', title: 'THERMOS', image: '../assets/mockups/Thermos1.png', description: 'In nostrum consectetur est veniam blanditiis aut beatae deserunt est sint...', priceNew: '€39,99', priceOld: '€39,99', promo: 'PROMO 30%', price: 39.99 },
    { id: 6, category: 'KLEDIJ', title: 'HOODIE', image: '../assets/mockups/Hoodie.png', description: 'In nostrum consectetur est veniam blanditiis aut beatae deserunt est sint...', priceNew: '€39,99', priceOld: '€39,99', promo: 'PROMO 30%', price: 39.99 },
    { id: 7, category: 'MULTI MEDIA', title: 'TABLET', image: '../assets/mockups/Tablet.png', description: 'In nostrum consectetur est veniam blanditiis aut beatae deserunt est sint...', priceNew: '€10/DAG', priceOld: '€15/DAG', promo: 'PROMO 30%', price: 10 },
    { id: 8, category: 'MULTI MEDIA', title: 'PROJECTOR', image: '../assets/mockups/beamer.png', description: 'In nostrum consectetur est veniam blanditiis aut beatae deserunt est sint...', priceNew: '€10/DAG', priceOld: '€15/DAG', promo: 'PROMO 30%', price: 10 },
    { id: 9, category: 'SPORTMATERIAAL', title: 'SPORTMAT', image: '../assets/mockups/Valmat.png', description: 'In nostrum consectetur est veniam blanditiis aut beatae deserunt est sint...', priceNew: '€10/DAG', priceOld: '€15/DAG', promo: 'PROMO 30%', price: 10 },
    { id: 10, category: 'SPORTMATERIAAL', title: 'SCHERMEN', image: '../assets/mockups/Fencing-bescherming.png', description: 'In nostrum consectetur est veniam blanditiis aut beatae deserunt est sint...', priceNew: '€10/DAG', priceOld: '€15/DAG', promo: 'PROMO 30%', price: 10 },
    { id: 11, category: 'SPORTMATERIAAL', title: 'KORFBAL', image: '../assets/mockups/Korfbal.png', description: 'In nostrum consectetur est veniam blanditiis aut beatae deserunt est sint...', priceNew: '€10/DAG', priceOld: '€15/DAG', promo: 'PROMO 30%', price: 10 },
    { id: 12, category: 'SPORTMATERIAAL', title: 'BASKETBAL', image: '../assets/mockups/basketball.png', description: 'In nostrum consectetur est veniam blanditiis aut beatae deserunt est sint...', priceNew: '€10/DAG', priceOld: '€15/DAG', promo: 'PROMO 30%', price: 10 },
    { id: 13, category: 'SPORTMATERIAAL', title: 'BALLSPORTEN', image: '../assets/mockups/Huurpakket.png', description: 'In nostrum consectetur est veniam blanditiis aut beatae deserunt est sint...', priceNew: '€10/DAG', priceOld: '€15/DAG', promo: 'PROMO 30%', price: 10 }
];
document.addEventListener('DOMContentLoaded', () => {
    localStorage.setItem('shopItems', JSON.stringify(shopItems));

    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }

    updateCartCounter();

    function renderItems(category, containerSelector) {
        const container = document.querySelector(containerSelector);
        if (!container) return;

        container.innerHTML = '';
        shopItems.filter(item => item.category === category).forEach(item => {
            container.innerHTML += `
                <div class="shop-item">
                    <div class="shop-item-image">
                        <img src="${item.image}" alt="${item.title}">
                        <span class="promo-badge">${item.promo}</span>
                    </div>
                    <div class="shop-item-content">
                        <h3 class="shop-item-title">${item.title}</h3>
                        <p class="shop-item-description">${item.description}</p>
                        <div class="shop-item-pricing">
                            <span class="price-new">${item.priceNew}</span>
                            <span class="price-old">${item.priceOld}</span>
                        </div>
                        <div class="shop-item-footer">
                            <button class="info-button" data-item-id="${item.id}">More info</button>
                            <button class="cart-button" data-item-id="${item.id}">🛒</button>
                        </div>
                    </div>
                </div>`;
        });
    }


    function initCarousels() {
        renderItems('KLEDIJ', '.shop-third .shop-items');
        renderItems('MULTI MEDIA', '.shop-five .shop-items');
        renderItems('SPORTMATERIAAL', '.shop-six .shop-items');

        addInfoButtonEventListeners();
    }

    function addInfoButtonEventListeners() {
        const infoButtons = document.querySelectorAll('.info-button');
        infoButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const itemId = e.target.getAttribute('data-item-id');
                window.location.href = `samshopDetail.html?id=${itemId}`;
            });
        });

        const cartButtons = document.querySelectorAll('.cart-button');
        cartButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const itemId = e.target.getAttribute('data-item-id');
                addToCart(itemId);
            });
        });
    }

    function addToCart(itemId) {
        const item = shopItems.find(item => item.id == itemId);
        if (!item) return;

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        const existingItemIndex = cart.findIndex(cartItem => cartItem.id == itemId);

        if (existingItemIndex >= 0) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push({
                id: item.id,
                title: item.title,
                image: item.image,
                price: item.price,
                priceFormatted: item.priceNew,
                category: item.category,
                quantity: 1
            });
        }
        localStorage.setItem('cart', JSON.stringify(cart));

        showCartNotification(item.title);
        updateCartCounter();
    }

    function showCartNotification(productName) {
        const message = document.getElementById('cart-message');
        if (!message) return;

        message.textContent = `${productName} is toegevoegd aan je winkelwagen!`;
        message.classList.remove('hidden');
        message.classList.add('show');

        setTimeout(() => {
            message.classList.remove('show');
            message.classList.add('hidden');
        }, 500);
    }

    function updateCartCounter() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        const cartCountEl = document.querySelector('.cart-count');

        if (cartCountEl) {
            cartCountEl.textContent = totalItems;
            cartCountEl.style.display = totalItems > 0 ? 'block' : 'none';
        }

        console.log(`Winkelwagen bevat ${totalItems} item(s)`);
    }

    window.addEventListener('resize', initCarousels);
    initCarousels();
});

