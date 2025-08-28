// Define an array of supported languages with additional data
const languages = [
    { name: "Spanish", difficulty: "Medium", speakers: "559 million" },
    { name: "German", difficulty: "Hard", speakers: "130 million" },
    { name: "Russian", difficulty: "Hard", speakers: "258 million" }
];

// Track the selected language
let selectedLanguage = null;

// Function to display language details in the content area
function displayLanguageDetails(langObj) {
    const contentDiv = document.querySelector('.content');
    if (!langObj) {
        contentDiv.innerHTML = "<p>Please select a language to learn more.</p>";
        return;
    }
    // Conditional to customize message based on difficulty
    const difficultyMessage = langObj.difficulty === "Hard" 
        ? "This language is challenging but rewarding!" 
        : "This language is approachable for beginners!";
    
    contentDiv.innerHTML = `
        <h3>${langObj.name}</h3>
        <p>Difficulty: ${langObj.difficulty}</p>
        <p>Speakers: ${langObj.speakers}</p>
        <p>${difficultyMessage}</p>
    `;
}

// Function to toggle visibility of the fun fact section
function toggleFunFact() {
    const funFactDiv = document.querySelector('.sidebar');
    funFactDiv.style.display = funFactDiv.style.display === "none" ? "block" : "none";
}

// Function to populate language cards dynamically using a loop
function populateLanguageCards() {
    const languageCardsDiv = document.querySelector('.card-container');
    // Clear existing cards
    languageCardsDiv.innerHTML = ""; 
    
    // Loop through languages array to create cards
    languages.forEach(lang => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h3>${lang.name}</h3>
            <p>This card will open up new paths to the ${lang.name} Language</p>
            <button class="learn-more">Learn More</button>
        `;
        languageCardsDiv.appendChild(card);
    });
}

// Function to simulate a countdown for learning motivation (using while loop)
function startLearningCountdown() {
    let count = 5;
    const contentDiv = document.querySelector('.content');
    contentDiv.innerHTML = "<p>Preparing to learn... Starting in:</p>";
    
    // While loop for countdown
    while (count > 0) {
        const countdownElement = document.createElement('p');
        countdownElement.textContent = `${count}...`;
        contentDiv.appendChild(countdownElement);
        count--;
        // Note: For simplicity, this is synchronous. In a real app, use setInterval for async timing.
    }
    contentDiv.innerHTML += "<p>Let's start learning!</p>";
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialize language cards
    populateLanguageCards();

    // Add click event listeners to "Learn More" buttons
    const learnMoreButtons = document.querySelectorAll('.card button');
    learnMoreButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            selectedLanguage = languages[index];
            displayLanguageDetails(selectedLanguage);
            // Highlight selected card
            document.querySelectorAll('.card').forEach(card => card.classList.remove('selected'));
            button.parentElement.classList.add('selected');
        });
    });

    // Toggle fun fact on click
    const funFactHeader = document.querySelector('.sidebar');
    if (funFactHeader) {
        funFactHeader.addEventListener('click', toggleFunFact);
    }

    // Add interactivity to navigation links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const contentDiv = document.querySelector('.content');
            if (link.textContent === "Home") {
                contentDiv.innerHTML = "<p>Welcome to Language Learner! Select a language to begin.</p>";
                selectedLanguage = null;
            } else if (link.textContent === "Language") {
                startLearningCountdown();
            } else if (link.textContent === "Language Maps") {
                contentDiv.innerHTML = "<p>Explore language distribution maps (coming soon)!</p>";
            } else if (link.textContent === "Help") {
                contentDiv.innerHTML = "<p>Contact support at help@languagelearner.com</p>";
            }
        });
    });
});