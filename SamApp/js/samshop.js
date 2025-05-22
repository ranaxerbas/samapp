export    const shopItems = [
    { id: 1, category: 'KLEDIJ', title: 'T-SHIRT', image: '../assets/mockups/Tshirt1-blue.png', description: 'In nostrum consectetur est veniam blanditiis aut beatae deserunt est sint...', priceNew: '€39,99', priceOld: '€39,99', promo: 'PROMO 30%', price: 39.99 },
    { id: 2, category: 'KLEDIJ', title: 'SNEAKER A', image: '../assets/mockups/Sneakers1.png', description: 'In nostrum consectetur est veniam blanditiis aut beatae deserunt est sint...', priceNew: '€39,99', priceOld: '€39,99', promo: 'PROMO 30%', price: 39.99 },
    { id: 3, category: 'KLEDIJ', title: 'SNEAKER B', image: '../assets/mockups/Gympantoffels.png', description: 'In nostrum consectetur est veniam blanditiis aut beatae deserunt est sint...', priceNew: '€39,99', priceOld: '€39,99', promo: 'PROMO 30%', price: 39.99 },
    { id: 4, category: 'KLEDIJ', title: 'SHORT', image: '../assets/mockups/Short1-blue.png', description: 'In nostrum consectetur est veniam blanditiis aut beatae deserunt est sint...', priceNew: '€39,99', priceOld: '€39,99', promo: 'PROMO 30%', price: 39.99 },
    { id: 5, category: 'KLEDIJ', title: 'THERMOS', image: '../assets/mockups/Thermos1.png', description: 'In nostrum consectetur est veniam blanditiis aut beatae deserunt est sint...', priceNew: '€39,99', priceOld: '€39,99', promo: 'PROMO 30%', price: 39.99 },
    { id: 6, category: 'KLEDIJ', title: 'HOODIE', image: '../assets/mockups/Hoodie.png', description: 'In nostrum consectetur est veniam blanditiis aut beatae deserunt est sint...', priceNew: '€39,99', priceOld: '€39,99', promo: 'PROMO 30%', price: 39.99 },
    { id: 7, category: 'MULTI MEDIA', title: 'TABLET', image: '../assets/mockups/Tablet.png', description: 'In nostrum consectetur est veniam blanditiis aut beatae deserunt est sint...', priceNew: '€10/DAG', priceOld: '€15/DAG', promo: 'PROMO 30%', price: 10 },
    { id: 8, category: 'MULTI MEDIA', title: 'PROJECTOR', image: '../assets/mockups/Beamer.png', description: 'In nostrum consectetur est veniam blanditiis aut beatae deserunt est sint...', priceNew: '€10/DAG', priceOld: '€15/DAG', promo: 'PROMO 30%', price: 10 },
    { id: 9, category: 'SPORTMATERIAAL', title: 'SPORTMAT', image: '../assets/mockups/Valmat.png', description: 'In nostrum consectetur est veniam blanditiis aut beatae deserunt est sint...', priceNew: '€10/DAG', priceOld: '€15/DAG', promo: 'PROMO 30%', price: 10 },
    { id: 10, category: 'SPORTMATERIAAL', title: 'SCHERMEN', image: '../assets/mockups/Fencing-bescherming.png', description: 'In nostrum consectetur est veniam blanditiis aut beatae deserunt est sint...', priceNew: '€10/DAG', priceOld: '€15/DAG', promo: 'PROMO 30%', price: 10 },
    { id: 11, category: 'SPORTMATERIAAL', title: 'KORFBAL', image: '../assets/mockups/Korfbal.png', description: 'In nostrum consectetur est veniam blanditiis aut beatae deserunt est sint...', priceNew: '€10/DAG', priceOld: '€15/DAG', promo: 'PROMO 30%', price: 10 },
    { id: 12, category: 'SPORTMATERIAAL', title: 'BASKETBAL', image: '../assets/mockups/Basketball.png', description: 'In nostrum consectetur est veniam blanditiis aut beatae deserunt est sint...', priceNew: '€10/DAG', priceOld: '€15/DAG', promo: 'PROMO 30%', price: 10 },
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
                            <button class="cart-button" data-item-id="${item.id}"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.625 17.25H8.54719C8.19591 17.2499 7.85579 17.1266 7.58612 16.9015C7.31646 16.6764 7.13435 16.3637 7.07156 16.0181L4.56844 2.25H2.25" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.625 21C9.66053 21 10.5 20.1605 10.5 19.125C10.5 18.0895 9.66053 17.25 8.625 17.25C7.58947 17.25 6.75 18.0895 6.75 19.125C6.75 20.1605 7.58947 21 8.625 21Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.625 21C18.6605 21 19.5 20.1605 19.5 19.125C19.5 18.0895 18.6605 17.25 17.625 17.25C16.5895 17.25 15.75 18.0895 15.75 19.125C15.75 20.1605 16.5895 21 17.625 21Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.61406 13.5H18.3844C18.7357 13.4999 19.0758 13.3766 19.3454 13.1515C19.6151 12.9264 19.7972 12.6137 19.86 12.2681L21 6H5.25" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</button>
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

