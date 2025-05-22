import api from "./api.service.js"
import { shopItems } from './samshop.js';

window.addEventListener('load', voegtoe);

function getRol(rolid) {
    switch (rolid) {
        case 1:
            return "Admin";
        case 2:
            return "Directeur";
        case 3:
            return "Leerkracht";
        case 4:
            return "Ouder";
        case 5:
            return "Gebruiker";
        default:
            return "How???????????";
    }
}

async function voegtoe() {
    const response = await api.userGet();
    const user = Array.isArray(response.data) ? response.data[0] : response.data;

    // Fill user info
    document.getElementById("changeNaam").textContent = `${user.Firstname} ${user.Lastname}`;
    document.getElementById("changeRol").textContent = getRol(user.RoleId);
    document.getElementById("changeSchool").textContent = user.School;
    document.getElementById("changeEmail").textContent = user.Email;

    const orderContainer = document.querySelector('.order-history-container');
    if (!orderContainer) return;

    const orders = await api.orderHistoryGet(user.Id);
    if (!orders || orders.length === 0) {
        orderContainer.innerHTML = `<p>Geen eerdere bestellingen.</p>`;
        return;
    }

    orderContainer.innerHTML = '<h3>Order History</h3>';

    let orderIndex = 1;

    for (const order of orders) {
        const orderDate = new Date(order.orderDate).toLocaleString('nl-BE');
        const orderHeader = document.createElement('div');
        orderHeader.style.margin = '20px 0 10px 0';
        orderHeader.innerHTML = `
            <h4> Bestelling #${orderIndex++}</h4>
            <p><strong>Datum:</strong> ${orderDate}</p>
            <p><strong>Order ID:</strong> ${order.orderId}</p>
        `;
        orderContainer.appendChild(orderHeader);

        const orderResponse = await api.orderItems(order.orderId);
        if (!orderResponse || orderResponse.length === 0) continue;

        const items = orderResponse[0].Items;
        let totalOrderPrice = 0;

        for (const item of items) {
            const shopItem = shopItems.find(i => i.title === item.ProductType);
            if (shopItem) {
                // Found item in shopItems
                const title = shopItem.title;
                const price = shopItem.price;
                const priceFormatted = price ? `€${price.toFixed(2)}` : "€--";
                const imgSrc = shopItem.image;

                const itemTotal = price * item.Quantity;
                totalOrderPrice += itemTotal;

                const orderItem = document.createElement('div');
                orderItem.className = 'order-item';
                orderItem.innerHTML = `
                    <img src="${imgSrc}" alt="${title}">
                    <div class="order-item-info">
                        <h4>${title}</h4>
                        <p>Aantal: ${item.Quantity}</p>
                        <p>Prijs per stuk: ${priceFormatted}</p>
                        <p>Subtotaal: €${itemTotal.toFixed(2)}</p>
                    </div>
                `;
                orderContainer.appendChild(orderItem);

            } else {
                // Not found in shopItems, fetch details from API
                try {
                    const details = await api.getItemDetail(item.ProductType, item.ProductId);

                    for (const detail of details) {
                        const img = document.createElement('img');
                        img.src = detail.image || `../assets/images/${item.ProductType}.png`;
                        img.alt = detail.name || 'Product';
                        img.className = 'order-img';

                        const infoDiv = document.createElement('div');
                        infoDiv.className = 'order-item-info';

                        const titleEl = document.createElement('h4');
                        titleEl.textContent = `${item.ProductType}: ${detail.duration || ''}`;

                        const quantity = document.createElement('p');
                        quantity.textContent = `Aantal: ${item.Quantity}`;

                        const price = detail.price || 0;
                        const total = document.createElement('p');
                        total.textContent = `Totaal: €${(price * item.Quantity).toFixed(2)}`;

                        infoDiv.appendChild(titleEl);
                        infoDiv.appendChild(quantity);
                        infoDiv.appendChild(total);

                        const itemContainer = document.createElement('div');
                        itemContainer.className = 'order-item';
                        itemContainer.appendChild(img);
                        itemContainer.appendChild(infoDiv);

                        orderContainer.appendChild(itemContainer);

                        totalOrderPrice += price * item.Quantity;
                    }
                } catch (error) {
                    console.error('Error fetching item details:', error);
                }
            }
        }

        const totalDiv = document.createElement('div');
        totalDiv.style.textAlign = 'right';
        totalDiv.style.fontWeight = 'bold';
        totalDiv.style.marginBottom = '30px';
        totalDiv.textContent = `Totaal prijs bestelling: €${totalOrderPrice.toFixed(2)}`;
        orderContainer.appendChild(totalDiv);
    }
}

document.querySelector(".uitloggen").addEventListener("click", uitloggen);
function uitloggen() {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("cart")
    window.location.href = "../html/index.html";
}

// document.addEventListener('DOMContentLoaded', () => {
//     const orders = JSON.parse(localStorage.getItem("orders")) || [];
//     const orderContainer = document.querySelector('.order-history-container');
//
//     if (!orderContainer) return;
//
//     if (orders.length === 0) {
//         orderContainer.innerHTML += `<p>Geen eerdere bestellingen.</p>`;
//         return;
//     }
//
//     orderContainer.innerHTML = '<h3>Order History</h3>';
//
//     orders.forEach((order, index) => {
//         let totalOrderPrice = 0;
//
//         const orderHeader = document.createElement('div');
//         orderHeader.style.margin = '20px 0 10px 0';
//         orderHeader.innerHTML = `
//             <h4> Bestelling #${index + 1}</h4>
//             <p><strong>Datum:</strong> ${new Date(order.date).toLocaleString('nl-BE')}</p>
//         `;
//         orderContainer.appendChild(orderHeader);
//
//         order.items.forEach(item => {
//             const itemTotal = item.price * item.quantity;
//             totalOrderPrice += itemTotal;
//
//             const orderItem = document.createElement('div');
//             orderItem.className = 'order-item';
//             orderItem.innerHTML = `
//                 <img src="${item.image}" alt="${item.title}">
//                 <div class="order-item-info">
//                     <h4>${item.title}</h4>
//                     <p>Aantal: ${item.quantity}</p>
//                     <p>Prijs per stuk: ${item.priceFormatted}</p>
//                     <p>Subtotaal: €${itemTotal.toFixed(2)}</p>
//                 </div>
//             `;
//             orderContainer.appendChild(orderItem);
//         });
//
//         const totalDiv = document.createElement('div');
//         totalDiv.style.textAlign = 'right';
//         totalDiv.style.fontWeight = 'bold';
//         totalDiv.style.marginBottom = '30px';
//         totalDiv.textContent = `Totaal prijs #${index + 1}: €${totalOrderPrice.toFixed(2)}`;
//         orderContainer.appendChild(totalDiv);
//     });
// });
