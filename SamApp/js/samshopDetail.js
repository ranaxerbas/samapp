document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('id');

    if (!itemId) {
        showErrorMessage('Product ID ontbreekt. Ga terug naar de homepagina.');
        return;
    }

    const shopItemsJson = localStorage.getItem('shopItems');
    if (!shopItemsJson) {
        showErrorMessage('Productgegevens niet gevonden. Ga terug naar de homepagina.');
        return;
    }

    const shopItems = JSON.parse(shopItemsJson);
    const item = shopItems.find(item => item.id === parseInt(itemId));

    if (!item) {
        showErrorMessage('Product niet gevonden. Ga terug naar de homepagina.');
        return;
    }

    renderProductDetail(item);
});

function showErrorMessage(message) {
    const detailContainer = document.getElementById('product-detail');
    detailContainer.innerHTML = `
        <div class="error-message">
            <p>${message}</p>
            <button class="back-button" onclick="window.location.href='index.html'">Terug naar Home</button>
        </div>
    `;
}

function renderProductDetail(item) {
    const detailContainer = document.getElementById('product-detail');
    const specifications = generateSpecifications(item);

    detailContainer.innerHTML = `
        <div class="product-image">
            <img src="${item.image}" alt="${item.title}">
            ${item.promo ? `<span class="promo-badge-detail">${item.promo}</span>` : ''}
        </div>
        <div class="product-info">
            <div class="product-category">${item.category}</div>
            <h1 class="product-title">${item.title}</h1>
            <p class="product-description">${description(item)}</p>
            
            <div class="product-pricing">
                <span class="price-new-detail">${item.priceNew}</span>
                ${item.priceOld !== item.priceNew ? `<span class="price-old-detail">${item.priceOld}</span>` : ''}
            </div>
            
            <div class="action-buttons">
                <button class="back-button" onclick="window.location.href='../html/samshop.html'">Terug naar Shop</button>
                <button class="add-to-cart-button">
                    <span>Toevoegen aan Winkelwagen</span>
                    <span class="add-to-cart-btn"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.625 17.25H8.54719C8.19591 17.2499 7.85579 17.1266 7.58612 16.9015C7.31646 16.6764 7.13435 16.3637 7.07156 16.0181L4.56844 2.25H2.25" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.625 21C9.66053 21 10.5 20.1605 10.5 19.125C10.5 18.0895 9.66053 17.25 8.625 17.25C7.58947 17.25 6.75 18.0895 6.75 19.125C6.75 20.1605 7.58947 21 8.625 21Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.625 21C18.6605 21 19.5 20.1605 19.5 19.125C19.5 18.0895 18.6605 17.25 17.625 17.25C16.5895 17.25 15.75 18.0895 15.75 19.125C15.75 20.1605 16.5895 21 17.625 21Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.61406 13.5H18.3844C18.7357 13.4999 19.0758 13.3766 19.3454 13.1515C19.6151 12.9264 19.7972 12.6137 19.86 12.2681L21 6H5.25" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg></span>
                </button>
            </div>
            
            <div class="product-specs">
                <h2 class="specs-title">Productspecificaties</h2>
                <div class="specs-list">
                    ${specifications.map(spec => `
                        <div class="specs-item">
                            <span class="specs-label">${spec.label}</span>
                            <span class="specs-value">${spec.value}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;

    document.querySelector('.add-to-cart-button').addEventListener('click', () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        const existingItem = cart.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            existingItem.quantity += 1;
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
        showMessage(`${item.title} is toegevoegd aan je winkelwagen!`);
    });
}

function description(item) {
    const productDescription = item.description || 'Geen beschrijving beschikbaar.';
    const additionalInfoByCategory = {
        'KLEDIJ': 'Deze kledij is gemaakt van hoogwaardige materialen voor optimaal comfort en duurzaamheid. Perfect voor dagelijks gebruik of sportieve activiteiten.',
        'MULTI MEDIA': 'Deze multimedia apparatuur is ontworpen voor optimale prestaties en gebruiksgemak. Ideaal voor zowel thuisgebruik als professionele toepassingen.',
        'SPORTMATERIAAL': 'Dit sportmateriaal is ontwikkeld voor intensief gebruik en biedt de juiste ondersteuning voor sportieve prestaties. Geschikt voor zowel beginners als gevorderde sporters.'
    };
    return `${productDescription} ${additionalInfoByCategory[item.category] || ''}`;
}

function generateSpecifications(item) {
    const productDetails = [
        { label: 'Artikelnummer', value: `SAM-${item.id.toString().padStart(4, '0')}` },
        { label: 'Categorie', value: item.category },
        { label: 'Beschikbaarheid', value: 'Op voorraad' }
    ];

    const categorySpecificSpecs = {
        'KLEDIJ': [
            { label: 'Materiaal', value: 'Katoen/Polyester' },
            { label: 'Maten', value: 'XS, S, M, L, XL' },
            { label: 'Kleuren', value: 'Blauw, Rood, Zwart' },
            { label: 'Wasvoorschrift', value: 'Machinewasbaar 30°C' }
        ],
        'MULTI MEDIA': [
            { label: 'Merk', value: 'SamTech' },
            { label: 'Garantie', value: '2 jaar' },
            { label: 'Afmetingen', value: '25 x 15 x 5 cm' },
            { label: 'Aansluitingen', value: 'USB-C, HDMI' }
        ],
        'SPORTMATERIAAL': [
            { label: 'Geschikt voor', value: 'Binnen- en buitensport' },
            { label: 'Gewicht', value: '1.2 kg' },
            { label: 'Materiaal', value: 'Hoogwaardig kunststof' },
            { label: 'Leeftijd', value: 'Alle leeftijden' }
        ]
    };

    return [...productDetails, ...(categorySpecificSpecs[item.category] || [])];
}

function showMessage(text) {
    const message = document.getElementById('cart-message');
    if (!message) return;

    message.textContent = text;
    message.classList.remove('hidden');
    message.classList.add('show');

    setTimeout(() => {
        message.classList.remove('show');
        message.classList.add('hidden');
    }, 500);
}
