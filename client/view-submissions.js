document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('/api/submissions');
    const submissions = await response.json();
    const tbody = document.querySelector('#submissions-table tbody');
    tbody.innerHTML = '';

    if (!submissions.length) {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.colSpan = 3;
        td.textContent = 'No submissions found.';
        tr.appendChild(td);
        tbody.appendChild(tr);
        return;
    }

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