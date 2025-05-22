import api from "./api.service.js"

const sport ="";
window.addEventListener('load', voegtoe);
function ColorGet(grade) {
    switch (grade){
        case 0:
            return { color: "#239127", label: "Beginner" }
        case 1:
            return { color: "#DFD119", label: "Gemakkelijk" }
        case 2:
            return { color: "#E07400", label: "Gemiddeld" }
        case 3:
            return { color: "#D81D16", label: "Uitdagend" }
        default:
            return { color: "purple", label: "WTF BRO" };
    }
}
async function voegtoe() {
    const params = new URLSearchParams(window.location.search);
    const exerciseId = params.get("exerciseId");
    const sportId = params.get("sportId");

    const response = await api.ExeGetOneSport(sportId, exerciseId);
    const oefeningData = Array.isArray(response.data) ? response.data : [response.data];
    // const oefeningData = Array.isArray(dummyResponse.data) ? dummyResponse.data : [dummyResponse.data];

    console.log("Loaded exercises:", oefeningData);

    const container = document.getElementById("oefeningenContainer");
    if (!container) return;

    container.innerHTML = "";

    const sportMap = new Map();

    oefeningData.forEach((exercise) => {
        const sport = exercise.Sport ?? "Geen sport opgegeven";

        const gradeInfo = ColorGet(exercise.Grade);

        let sportSection = sportMap.get(sport);
        if (!sportSection) {
            sportSection = document.createElement("div");
            sportSection.classList.add("sportGroup");

            container.appendChild(sportSection);
            sportMap.set(sport, sportSection);
        }
        const kaart = document.createElement("div");
        kaart.classList.add("kaart");
        kaart.innerHTML = `
            <div style="background: ${gradeInfo.color}; padding: 5px; border-radius: 4px; color: white; width: 30%;margin-bottom: 1rem;">
                            <p>${gradeInfo.label}</p>
                        </div>
            <iframe width="1280" height="480" 
                src="${exercise.Video}" 
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>
            <p class="name">${exercise.Name?.toUpperCase() ?? "NAAM ONBEKEND"}</p>
            <p class="descriptie">${exercise.Description ?? ""}</p>
            
        `;

        sportSection.appendChild(kaart);
    });
}
