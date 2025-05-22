const challenges = [
    {
        title: "Balsport",
        images: [
            { src: "../assets/images/illustrations/voetal.jpg",id: "Voetbal", alt: "Challenge 1", link: "../html/oefeningenDetail.html" },
            { src: "../assets/images/illustrations/basketballe.jpg",id: "Basketbal", alt: "Challenge 2", link: "../html/oefeningenDetail.html" },
            { src: "../assets/images/illustrations/tennis.jpg",id: "Tennis", alt: "Challenge 3", link: "../html/oefeningenDetail.html" },
            { src: "../assets/images/illustrations/vollebal.jpg",id: "Volleybal", alt: "Challenge 4", link: "../html/oefeningenDetail.html" }
        ]
    },
    {
        title: "Turnen",
        images: [
            { src: "../assets/images/illustrations/gymnastiek.jpg",id: "Gymnastiek", alt: "Challenge 1", link: "../html/oefeningenDetail.html" },
            { src: "../assets/images/illustrations/trampolinen.jpg",id: "Trampoline", alt: "Challenge 2", link: "../html/oefeningenDetail.html" },
            { src: "../assets/images/illustrations/calesthenics.jpg",id: "Calesthenics", alt: "Challenge 3", link: "../html/oefeningenDetail.html" },
            { src: "../assets/images/illustrations/turnen.png",id: "Turnen", alt: "Challenge 4", link: "../html/oefeningenDetail.html" }
        ]
    },
    {
        title: "Contact sporten",
        images: [
            { src: "../assets/images/illustrations/karate.jpg",id: "Karate", alt: "Challenge 1", link: "../html/oefeningenDetail.html" },
            { src: "../assets/images/illustrations/judo.jpg",id: "Judo", alt: "Challenge 2", link: "../html/oefeningenDetail.html" },
            { src: "../assets/images/illustrations/krav-maga.jpg",id: "Krav-maga", alt: "Challenge 3", link: "../html/oefeningenDetail.html" }
        ]
    },
    {
        title: "Watersporten",
        images: [
            { src: "../assets/images/illustrations/schoolslag.jpeg",id: "Schoolslag", alt: "Challenge 1", link: "../html/oefeningenDetail.html" },
            { src: "../assets/images/illustrations/crawl.jpg",id: "Crawl", alt: "Challenge 2", link: "../html/oefeningenDetail.html" },
            { src: "../assets/images/illustrations/surfen.jpg",id: "Surfen", alt: "Challenge 3", link: "../html/oefeningenDetail.html" },
            { src: "../assets/images/illustrations/kayakken.jpg",id: "Kayakken", alt: "Challenge 4", link: "../html/oefeningenDetail.html" }
        ]
    },
    {
        title: "Racketsporten",
        images: [
            { src: "../assets/images/illustrations/badminton.jpg",id: "Badminton", alt: "Challenge 1", link: "../html/oefeningenDetail.html" },
            { src: "../assets/images/illustrations/tennis2.jpg",id: "Tennis", alt: "Challenge 2", link: "../html/oefeningenDetail.html" },
            { src: "../assets/images/illustrations/squash.jpeg",id: "Squash", alt: "Challenge 3", link: "../html/oefeningenDetail.html" },
        ]
    },
    {
        title: "Buitensporten",
        images: [
            { src: "../assets/images/illustrations/lopen.jpg",id: "Lopen", alt: "Challenge 1", link: "../html/oefeningenDetail.html" },
            { src: "../assets/images/illustrations/skaten.jpg",id: "Skaten", alt: "Challenge 2", link: "../html/oefeningenDetail.html" },
            { src: "../assets/images/illustrations/paardrijden.jpg",id: "Paardrijden", alt: "Challenge 3", link: "../html/oefeningenDetail.html" },
            { src: "../assets/images/illustrations/boogschieten.jpg",id: "Boogschieten", alt: "Challenge 4", link: "../html/oefeningenDetail.html" },
            { src: "../assets/images/illustrations/honkbal.jpg",id: "Honkbal", alt: "Challenge 5", link: "../html/oefeningenDetail.html" }
        ]
    }
];
const container = document.getElementById("challenges-container");


challenges.forEach(category => {
    const section = document.createElement("section");
    section.classList.add("challenges");

    const header = document.createElement("div");
    header.classList.add("challenges-header");
    header.innerHTML = `<h1 class="challenges-title">${category.title}</h1>`;
    section.appendChild(header);

    const sliderContainer = document.createElement("div");
    sliderContainer.classList.add("challenges-slider-container");

    const slider = document.createElement("div");
    slider.classList.add("challenges-slider");

    category.images.forEach(image => {
        const slide = document.createElement("div");
        slide.classList.add("challenges-slide");
        slide.innerHTML = `<a href="${image.link}?id=${image.id}"><img src="${image.src}" alt="${image.alt}" /></a>`;
        slider.appendChild(slide);
    });

    sliderContainer.appendChild(slider);
    section.appendChild(sliderContainer);
    container.appendChild(section);
});



