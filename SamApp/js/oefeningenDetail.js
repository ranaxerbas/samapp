import api from "./api.service.js"
let View = "";

window.addEventListener('load', voegtoe);

function getYouTubeThumbnail(videoUrl) {
    if (!videoUrl) return null;
    const regex = /\/embed\/([^?&]+)/;
    const match = videoUrl.match(regex);
    return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null;
}
async function voegtoe() {
    const params = new URLSearchParams(window.location.search);
    const sportid = params.get("id");

    const headerDiv = document.getElementsByClassName("header-bg")[0];
    const h = headerDiv.querySelector("h1");
    h.textContent = sportid;

    const response = await api.ExeGetSport(sportid);




    const SportData = Array.isArray(response.data) ? response.data : [response.data];
    console.log("Loaded exercises:", SportData);


    const gradeContainerMap = {
        0: document.getElementById("container-eenvoudig"),
        1: document.getElementById("container-basis"),
        2: document.getElementById("container-uitdagender"),
        3: document.getElementById("container-realdeal"),
    };


    Object.values(gradeContainerMap).forEach(container => {
        if (container) container.innerHTML = "";
    });

    SportData.forEach((exercise, index) => {
        const grade = exercise.Grade ?? -1;
        const container = gradeContainerMap[grade];
        if (!container) return;



        const col = document.createElement("div");
        col.classList.add("col-md-4", "exercise", "mb-4");
        col.id = `${exercise.Id}`;


        const img = document.createElement("img");
        const ytThumb = getYouTubeThumbnail(exercise.Video);
        img.src = ytThumb ?? exercise.Image ?? "../assets/images/illustrations/default.png";
        img.alt = exercise.Name ?? "Oefening";
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
            window.location.href = `oefeningenHome.html?exerciseId=${exercise.Id}&sportId=${sportid}`;
        });

        const title = document.createElement("div");
        title.classList.add("exercise-title");
        title.textContent = exercise.Name ?? "NAAM ONBEKEND";

        col.appendChild(img);
        col.appendChild(title);

        container.appendChild(col);
    });

    const buttons = document.querySelectorAll('.btn-category');
    const Divs = document.querySelectorAll('.grade');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const name = button.textContent.trim();
            ViewGrade(name)
        });
    });
    function ViewGrade(grade) {
        if (View === grade){
            Divs.forEach(div => {
                div.style.display = 'block';
            });
            View = "";
            return;
        }
        Divs.forEach(div => {
            if (div.id === grade) {
                div.style.display = 'block';
                View = div.id
            } else {
                div.style.display = 'none';
            }
        });
    }
}
