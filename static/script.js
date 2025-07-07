const accordionElements = document.querySelectorAll("li");

document.addEventListener("DOMContentLoaded", () => {
    for (const element of accordionElements) {
        const toggleButton = element.querySelector(".toggle");
        const elementHeading = element.querySelector("h2");
        
        toggleButton.addEventListener("click", toggleElement);
        elementHeading.addEventListener("click", toggleElement);
    }
});



function openElement(targetElement) {
    for (const element of accordionElements) {
        element.classList.replace("open", "closed");
    }
    targetElement.classList.replace("closed", "open");
}

function toggleElement(e) {
    const targetElement = e.target.parentElement.parentElement;
    if (targetElement.classList.contains("closed")) {
        openElement(targetElement);
    } else {
        targetElement.classList.replace("open", "closed");
    }
}
