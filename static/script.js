const accordionElements = document.querySelectorAll("li");
const body = document.querySelector("body");
const paragraphs = document.querySelectorAll("p");

document.addEventListener("DOMContentLoaded", () => {
    for (const element of accordionElements) {
        const toggleButton = element.querySelector(".toggle");
        const elementHeading = element.querySelector("h2");
        
        toggleButton.addEventListener("click", toggleElement);
        elementHeading.addEventListener("click", toggleElement);
    }

    // Dynamically set accordion paragraph heights to the height of the tallest paragraph
    window.addEventListener("load", setParagraphHeight);
    window.addEventListener("resize", setParagraphHeight);
});


async function getParagraphHeight() {
    document.documentElement.style.setProperty("--p-height", "auto");

    const temp = document.createElement("p");
    temp.style.visibility = "hidden";
    temp.style.position = "fixed";
    temp.style.width = getComputedStyle(paragraphs[0]).getPropertyValue("width");
    body.appendChild(temp);

    let maxHeight = 0;
    for (const p of paragraphs) {
        temp.textContent = p.textContent;
        const height = parseFloat(getComputedStyle(temp).getPropertyValue("height").replace("px", ""));
        maxHeight = Math.max(maxHeight, height);
    }

    body.removeChild(temp);
    return `${maxHeight}px`;
}

function openElement(targetElement) {
    for (const element of accordionElements) {
        element.classList.replace("open", "closed");
    }
    targetElement.classList.replace("closed", "open");
}

function setParagraphHeight() {
    requestAnimationFrame(() => {
        getParagraphHeight().then(height => {
            document.documentElement.style.setProperty("--p-height", height);
        })
    });
}

function toggleElement(e) {
    const targetElement = e.target.parentElement.parentElement;
    if (targetElement.classList.contains("closed")) {
        openElement(targetElement);
    } else {
        targetElement.classList.replace("open", "closed");
    }
}
