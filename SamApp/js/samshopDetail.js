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
                    <span>🛒</span>
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
