document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('challenge-sheet.csv');
    const csvText = await response.text();
    const parsed = Papa.parse(csvText);
    const challenges = parsed.data.flat().filter(c => c && c.trim() !== '');

    const select = document.getElementById('challenge-name');
    challenges.forEach(challenge => {
        const option = document.createElement('option');
        option.value = challenge;
        option.textContent = challenge;
        select.appendChild(option);
    });

    document.getElementById('challenge-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const challengeName = document.getElementById('challenge-name').value;
        const challengeLink = document.getElementById('challenge-link').value;
        const discordUsername = document.getElementById('discord-username').value;

        const res = await fetch('/submit-challenge', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ challengeName, challengeLink, discordUsername })
        });

        if (res.ok) {
            alert('Submission recorded!');
            e.target.reset();
        } else {
            alert('Submission failed.');
        }
    });
});