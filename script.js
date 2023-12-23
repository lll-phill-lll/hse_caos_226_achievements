document.addEventListener('DOMContentLoaded', function () {
    const achievementsContainer = document.getElementById('achievementsContainer');

    fetch('achievements.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(achievementData => {
                displayAchievement(achievementData);
            });
        });

    function displayAchievement(achievementData) {
        const achievementElement = document.createElement('div');
        achievementElement.className = 'achievement';

        const imageElement = document.createElement('img');
        imageElement.src = achievementData.imageUrl;
        imageElement.alt = achievementData.personName;

        const textElement = document.createElement('p');
        textElement.innerText = achievementData.achievement;

        const personElement = document.createElement('p');
        personElement.innerText = achievementData.personName;

        const descriptionElement = document.createElement('div');
        descriptionElement.className = 'description';
        descriptionElement.innerHTML = `<strong>${achievementData.achievement}</strong><p><strong>Имя:</strong> ${achievementData.personName}</p><p><strong>Описание:</strong> ${achievementData.description}</p>`;

        achievementElement.appendChild(imageElement);
        achievementElement.appendChild(textElement);
        achievementElement.appendChild(personElement);
        achievementElement.appendChild(descriptionElement);

        achievementsContainer.appendChild(achievementElement);
    }
});
