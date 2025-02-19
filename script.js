// Game Variables
let score = 0;
let time = 60;
let reputation = 100;
let gameInterval;
let selectedCategory = null;  // Stores selected category

// DOM Elements
const mainMenu = document.getElementById('main-menu');
const gameScreen = document.getElementById('game-screen');
const shopScreen = document.getElementById('shop-screen');
const trendTargets = document.getElementById('trend-targets');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const reputationDisplay = document.getElementById('reputation');
const buttons = document.querySelectorAll('.category-button');

// Error Button
document.getElementById('error-button').addEventListener('click', () => {
    alert('An error has occurred!');
});

// Main Menu Buttons
document.getElementById('play-solo').addEventListener('click', () => {
    mainMenu.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    startGame();
});

document.getElementById('shop-button').addEventListener('click', () => {
    mainMenu.classList.add('hidden');
    shopScreen.classList.remove('hidden');
});

document.getElementById('back-to-menu').addEventListener('click', () => {
    shopScreen.classList.add('hidden');
    mainMenu.classList.remove('hidden');
});

// Image categories with assigned point values
const categoryImages = {
    edtech: [
        { src: "edtech1.png.jpeg", points: 10 },
        { src: "edtech2.png", points: 50 },
        { src: "edtech3.png", points: 20 },
        { src: "edtech4.png", points: 15 },
        { src: "edtech5.png", points: 5 },
        { src: "edtech6.png", points: 25 }
    ],
    ott: [
        { src: "ott1.png", points: 10 },
        { src: "ott2.png", points: 50 },
        { src: "ott3.png", points: 20 },
        { src: "ott4.png", points: 15 },
        { src: "ott5.png", points: 5 },
        { src: "ott6.png", points: 25 }
    ],
    fintech: [
        { src: "fintech1.png", points: 10 },
        { src: "fintech2.png", points: 50 },
        { src: "fintech3.png", points: 20 },
        { src: "fintech4.png", points: 15 },
        { src: "fintech5.png", points: 5 },
        { src: "fintech6.png", points: 25 }
    ],
    ecommerce: [
        { src: "ecom1.png", points: 10 },
        { src: "ecom2.png", points: 50 },
        { src: "ecom3.png", points: 20 },
        { src: "ecom4.png", points: 15 },
        { src: "ecom5.png", points: 5 },
        { src: "ecom6.png", points: 25 }
    ]
};

// Handle category selection
buttons.forEach(button => {
    button.addEventListener('click', () => {
        selectedCategory = button.getAttribute('data-category');
        spawnTrend();  // Spawn images for the selected category
    });
});

// Game Logic
function startGame() {
    score = 0;
    time = 60;
    reputation = 100;
    updateHUD();
    gameInterval = setInterval(gameLoop, 1000);
}

function gameLoop() {
    time--;
    if (time <= 0) endGame();
    updateHUD();
}

function updateHUD() {
    scoreDisplay.textContent = `Score: ${score}`;
    timerDisplay.textContent = `Time: ${time}`;
    reputationDisplay.textContent = `Reputation: ${reputation}`;
}

// Function to spawn category-based images
function spawnTrend() {
    if (!selectedCategory) {
        alert("Please select a category first!");
        return;
    }

    // Clear previous images
    trendTargets.innerHTML = "";

    // Get images from the selected category
    const images = categoryImages[selectedCategory];

    images.forEach((imageData) => {
        let trend = document.createElement('div');
        trend.className = 'trend';
        trend.style.left = `${Math.random() * 90}%`;
        trend.style.top = `${Math.random() * 90}%`;

        let img = document.createElement('img');
        img.src = imageData.src;
        img.alt = "Category Image";
        img.className = 'trend-image';

        // Click event to increase score
        img.addEventListener('click', () => {
            score += imageData.points;
            scoreDisplay.textContent = `Score: ${score}`;
            img.remove();
        });

        trend.appendChild(img);
        trendTargets.appendChild(trend);
    });
}

function endGame() {
    clearInterval(gameInterval);
    alert(`Game Over! Your Score: ${score}`);
    gameScreen.classList.add('hidden');
    mainMenu.classList.remove('hidden');
}
