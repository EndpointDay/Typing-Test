let timer = 30;
let interval;
let currentQuote = "";
let typedCharacters = 0;
let correctCharacters = 0;
let gameStarted = false;
const quoteElement = document.getElementById("quote");
const inputElement = document.getElementById("input");
const timerElement = document.getElementById("timer");
const wpmElement = document.getElementById("wpm");
const accuracyElement = document.getElementById("accuracy");
const restartButton = document.getElementById("restartButton");
const toggleParticlesButton = document.getElementById("toggleParticlesButton");
let particlesEnabled = true;

const quotes = [
    "Beneath the azure sky, where the golden sun gently kisses the tranquil sea, a curious cat ventured into a hidden grove, discovering a forgotten key that shimmered with ancient enchantments, unlocking a world where dreams wove seamlessly with reality, inviting every wanderer to explore the boundless realms of imagination.",
    "In a quiet village surrounded by lush green hills, an old librarian discovered a mysterious book that held the secrets to long-lost magical arts, setting in motion an adventure that would change the fate of the village forever.",
    "Amidst the bustling city streets, where neon lights flickered and crowds hurried by, a lone artist found inspiration in the smallest details of everyday life, capturing the essence of human experience on canvas with a passion that resonated with all who beheld his work.",
    "Under the moonlit canopy of a dense forest, a young adventurer stumbled upon an ancient portal hidden beneath a veil of vines, leading to a realm where mythical creatures roamed and legends came to life in a vibrant tapestry of wonder and mystery.",
    "In a world where technology and magic intertwined, a brilliant inventor created a device that bridged the gap between the realms of fantasy and reality, ushering in a new era of discovery and adventure.",
    "On the edge of a vast desert, where golden sands met the endless sky, a lone traveler discovered an ancient map leading to a hidden oasis, rumored to be the resting place of a legendary treasure lost to time.",
    "In the heart of a bustling metropolis, a secret society of scholars uncovered a forgotten manuscript that revealed the hidden truths about the universe, setting in motion a quest that would forever alter the course of human history.",
    "Amidst the swirling mists of a remote mountain range, a hermit lived in solitude, guarding a mystical crystal that held the power to alter the flow of time, waiting for the day when the world would need its magic once more.",
    "In a distant land where the seasons changed with the turn of a single page, a young scribe penned a story that held the key to unlocking the mysteries of an ancient prophecy, changing the fate of kingdoms and the lives of those who believed.",
    "By the shores of a tranquil lake, where the water mirrored the sky above, a wise old fisherman shared tales of a legendary sea creature whose songs had the power to heal the deepest wounds of the heart and soul.",
    "In the labyrinthine depths of an ancient castle, a group of explorers stumbled upon a hidden chamber filled with forgotten relics and magical artifacts, each holding a piece of a grand puzzle that had remained unsolved for centuries.",
    "Through the lush jungles of a faraway land, a brave adventurer embarked on a quest to find a mythical flower said to possess extraordinary healing powers, facing numerous trials and discovering hidden wonders along the way.",
    "In a quaint coastal village where the ocean breeze carried tales of old, a young dreamer crafted a beautiful sailboat and set out to explore uncharted waters, seeking adventures that would inspire stories for generations.",
    "Under the canopy of a star-studded night sky, a stargazer charted the movements of distant celestial bodies, unraveling the secrets of the cosmos and discovering the interconnectedness of all things in the universe.",
    "On a remote island surrounded by azure waves, an ancient civilization left behind a series of cryptic messages etched into stone tablets, leading modern-day explorers on a journey to uncover the island's lost history and its hidden treasures.",
    "In a serene valley where time seemed to stand still, a wise old sage shared timeless wisdom with those who sought enlightenment, teaching that the path to true understanding lay in the harmony of mind, body, and spirit.",
    "Within the walls of an old, forgotten library, a young bibliophile uncovered a hidden collection of enchanted books, each containing magical stories that came to life when read aloud, weaving tales of wonder and imagination."
];

function initParticles() {
    particlesJS("particles", {
        particles: {
            number: {
                value: 100,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: "#ffffff"
            },
            shape: {
                type: "circle",
                stroke: {
                    width: 0,
                    color: "#000000"
                }
            },
            opacity: {
                value: 0.8,
                random: true,
                animation: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
            }
        },
        interactivity: {
            detectsOn: "canvas",
            events: {
                onHover: {
                    enable: true,
                    mode: "push"
                },
                onClick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                repulse: {
                    distance: 100,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });
}

function toggleParticles() {
    if (particlesEnabled) {
        document.getElementById('particles').innerHTML = '';
        particlesEnabled = false;
    } else {
        initParticles();
        particlesEnabled = true;
    }
}

toggleParticlesButton.addEventListener("click", toggleParticles);

initParticles();

function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

function startGame() {
    currentQuote = getRandomQuote();
    quoteElement.innerHTML = currentQuote.split('').map(char => `<span>${char}</span>`).join('');
    inputElement.value = "";
    inputElement.disabled = false;
    inputElement.focus();
    gameStarted = false;
    timer = 30;
    timerElement.textContent = `${timer}s`;
    wpmElement.textContent = 'WPM: 0';
    accuracyElement.textContent = 'Accuracy: 100%';
}

function startTimer() {
    if (!gameStarted) {
        gameStarted = true;
        interval = setInterval(updateTimer, 1000);
    }
}

function updateTimer() {
    timer--;
    timerElement.textContent = `${timer}s`;
    if (timer === 0) {
        clearInterval(interval);
        inputElement.disabled = true;
        calculateResults();
    }
}

function calculateResults() {
    const wpm = (typedCharacters / 5) / ((30 - timer) / 60);
    const accuracy = (correctCharacters / typedCharacters) * 100;
    wpmElement.textContent = `WPM: ${Math.round(wpm)}`;
    accuracyElement.textContent = `Accuracy: ${Math.round(accuracy)}%`;
}

function resetGame() {
    clearInterval(interval);
    startGame();
}

inputElement.addEventListener("input", () => {
    if (!gameStarted) {
        startTimer();
    }

    const input = inputElement.value;
    typedCharacters++;

    const quoteArray = quoteElement.querySelectorAll('span');
    let correct = true;

    quoteArray.forEach((span, index) => {
        if (index < input.length) {
            if (input[index] === span.textContent) {
                span.classList.add('correct');
                span.classList.remove('incorrect');
                correctCharacters++;
            } else {
                span.classList.add('incorrect');
                span.classList.remove('correct');
                correct = false;
            }
        } else {
            span.classList.remove('correct', 'incorrect');
        }
    });

    if (input === currentQuote) {
        clearInterval(interval);
        calculateResults();
    }
});

restartButton.addEventListener("click", resetGame);

startGame();
