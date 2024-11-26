function scrollToContact() {
  document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
}

// Function to animate the score
function animateScore(element, start, end, duration, textElement) {
    let startTime = null;

    function countUp(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const value = Math.min(Math.floor(progress / duration * (end - start) + start), end);

        element.textContent = value + "+";

        if (progress < duration) {
            requestAnimationFrame(countUp);
        }
    }

    // Keep the "and still counting" text visible during the animation
    textElement.style.display = "block";
    textElement.style.opacity = 1;

    requestAnimationFrame(countUp);
}

// Detect when the score section comes into view
const scoreSection = document.getElementById('score');
const scoreElement = document.getElementById('scoreNumber');
const countingTextElement = document.getElementById('countingText');

// Initialize IntersectionObserver
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateScore(scoreElement, 0, 11000, 6000, countingTextElement); // 0 to 4000+ in 3 seconds
            observer.disconnect(); // Stop observing after animation starts
        }
    });
}, { threshold: 0.5 }); // Trigger when 50% of the section is visible

// Start observing the score section
observer.observe(scoreSection);
