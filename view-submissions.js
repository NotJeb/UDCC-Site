document.addEventListener('DOMContentLoaded', async () => {
    const res = await fetch('/submissions');
    const submissions = await res.json();
    const tbody = document.querySelector('#submissions-table tbody');
    submissions.forEach(sub => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${sub.challengeName}</td>
            <td><a href="${sub.challengeLink}" target="_blank">${sub.challengeLink}</a></td>
            <td>${sub.discordUsername}</td>
        `;
        tbody.appendChild(tr);
    });
});