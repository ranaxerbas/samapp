function closeBanner() {
    document.getElementById("cookie-banner").style.display = "none";
    localStorage.setItem("cookiesDismissed", "true");
}

window.onload = function() {
    if (!localStorage.getItem("cookiesDismissed")) {
        const banner = document.getElementById("cookie-banner");
        banner.style.display = "block";

        setTimeout(() => {
            if (banner.style.display !== "none") {
                banner.style.display = "none";
            }
        }, 10000);
    }
};

let slideIndex = 0;
const slides = document.querySelector('.challenges-slides');
const slideWidth = 320; // 300px + 20px gap

function updateSlide() {
    slides.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
}

function nextSlide() {
    const maxIndex = slides.children.length - 3;
    if (slideIndex < maxIndex) {
        slideIndex++;
        updateSlide();
    }
}

function prevSlide() {
    if (slideIndex > 0) {
        slideIndex--;
        updateSlide();
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const sponsors = [
        "../assets/images/logo/sponsor1.png",
        "../assets/images/logo/sponsor2.png",
        "../assets/images/logo/sponsor3.png",
        "../assets/images/logo/sponsor4.png",
        "../assets/images/logo/sponsor5.png",
        "../assets/images/logo/sponsor6.png",
        "../assets/images/logo/sponsor7.png",
        "../assets/images/logo/sponsor8.png"
    ];

    function createSponsorElement(src) {
        const div = document.createElement("div");
        div.classList.add("partner-item");
        const img = document.createElement("img");
        img.src = src;
        img.alt = "Sponsor logo";
        div.appendChild(img);
        return div;
    }

    function startSponsorLoop() {
        const container = document.getElementById("partnersContainer");
        container.classList.add("partners-scroll");

        const sponsorsList = [...sponsors, ...sponsors];
        sponsorsList.forEach(src => {
            container.appendChild(createSponsorElement(src));
        });
    }

    startSponsorLoop();
});


