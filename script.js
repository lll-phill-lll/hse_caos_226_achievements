document.addEventListener('DOMContentLoaded', function () {
    const achievementsContainer = document.getElementById('achievementsContainer');

    fetch('achievements.json')
        .then(response => response.json())
        .then(data => {
            const promises = data.map(achievementData => displayAchievement(achievementData));
            return Promise.all(promises);
        })
        .then(elements => {
            elements.forEach(element => achievementsContainer.appendChild(element));
        });

    function displayAchievement(achievementData) {
        return new Promise(resolve => {
            const achievementElement = document.createElement('div');
            achievementElement.className = 'achievement';

            const imageElement = document.createElement('img');
            imageElement.src = achievementData.imageUrl;
            imageElement.alt = achievementData.personName;
            imageElement.onload = function () {
                const textElement = document.createElement('p');
                textElement.innerText = achievementData.achievement;

                const personElement = document.createElement('p');
                personElement.innerText = achievementData.personName;
                personElement.innerHTML = `${achievementData.personName}`;

                const descriptionElement = document.createElement('div');
                descriptionElement.className = 'description';
                descriptionElement.innerHTML = `
                    <img src="${achievementData.imageUrl}" alt="${achievementData.personName}">
                    <strong>Название достижения:</strong>
                    <p>${achievementData.achievement}</p>
                    <strong>Имя человека:</strong>
                    <p>${achievementData.personName}</p>
                    <strong>Описание:</strong>
                    <p>${achievementData.description}</p>
                `;

                achievementElement.appendChild(imageElement);
                achievementElement.appendChild(textElement);
                achievementElement.appendChild(personElement);
                achievementElement.appendChild(descriptionElement);

                resolve(achievementElement);
            };
        });
    }
});
