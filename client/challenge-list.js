// Function to fetch and parse CSV
async function fetchChallenges() {
    const response = await fetch('/api/challenge-sheet.csv');
    const csvText = await response.text();
    const parsed = Papa.parse(csvText);
    return parsed.data;
}

// Function to render challenges to challenge-list.html
async function renderChallenges() {
    const tiers = await fetchChallenges();
    const container = document.getElementById('challenge-table');
    container.innerHTML = '';
    const tier_labels = [
        ["Beginner", "#4a86e8"],
        ["Intermediate", "#00ff00"],
        ["Advanced", "#ffff00"],
        ["Expert", "#ff9900"],
        ["Master", "#ff0000"],
        ["Elite", "#9900ff"],
        ["Mythic", "#0000ff"],
        ["Grandmaster", "#f1c232"]
    ];

    tier_labels.forEach(([name, color], i) => {
        const tierContainer = document.createElement('div');
        tierContainer.className = 'container';

        const tierHeader = document.createElement('h2');
        tierHeader.textContent = name;
        tierHeader.style.color = color;
        tierContainer.appendChild(tierHeader);

        // Get challenges for this tier if present
        const tier = tiers[i] || [];
        tier.forEach(challenge => {
            if (challenge && challenge.trim() !== '') {
                const item = document.createElement('p');
                item.innerHTML = `${challenge}`;
                tierContainer.appendChild(item);
            }
        });

        container.appendChild(tierContainer);
    });
}

// Run on page load
document.addEventListener('DOMContentLoaded', renderChallenges);