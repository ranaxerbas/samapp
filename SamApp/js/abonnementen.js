import api from "./api.service.js"


window.addEventListener('load', voegtoe);

async function voegtoe() {
     const response = await api.aboGet();
     const abonnementenData = Array.isArray(response.data) ? response.data : [response.data];
   //const abonnementenData = Array.isArray(dummyResponse.data) ? dummyResponse.data : [dummyResponse.data];

    const container = document.getElementById("abonnementenContainer");
    container.innerHTML = ""; // Clear container first

    abonnementenData.forEach((abonnement, index) => {
        const kaart = document.createElement("div");
        kaart.classList.add("kaart");

        if (index === 1) {
            kaart.classList.add("aanbevolen");
        }

        kaart.innerHTML = `
            ${index === 1 ? `<span class="label-aanbevolen">aanbevolen</span>` : ""}
            <h3>${abonnement.Duration.toUpperCase()}</h3>
            <p class="prijs">€${abonnement.Price.toFixed(2)}/student</p>
        `;

        container.appendChild(kaart);
    });
}