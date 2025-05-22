const questions = document.querySelectorAll(".faq-question");

questions.forEach((question) => {
    question.addEventListener("click", () => {
        const answer = question.nextElementSibling;
        const isOpen = answer.classList.contains("open");

        document.querySelectorAll(".faq-answer").forEach(ans => ans.classList.remove("open"));
        document.querySelectorAll(".faq-question").forEach(q => q.classList.remove("active"));

        if (!isOpen) {
            answer.classList.add("open");
            question.classList.add("active");
        }
    });
});
