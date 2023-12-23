document.addEventListener('DOMContentLoaded', function () {
    const achievementsContainer = document.getElementById('achievementsContainer');

    fetch('achievements.json')
        .then(response => response.json())
        .then(data => {
            // Создаем массив промисов для всех асинхронных операций
            const promises = data.map(achievementData => displayAchievement(achievementData));

            // Дожидаемся завершения всех операций перед добавлением в DOM
            return Promise.all(promises);
        })
        .then(elements => {
            // После завершения всех операций добавляем элементы в DOM
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
                // После загрузки изображения добавляем карточку с достижением
                const textElement = document.createElement('p');
                textElement.innerText = achievementData.achievement;

                const personElement = document.createElement('p');
                personElement.innerText = achievementData.personName;

                const descriptionElement = document.createElement('div');
                descriptionElement.className = 'description';
                descriptionElement.innerHTML = `<img src="${achievementData.imageUrl}" alt="${achievementData.personName}"><strong>${achievementData.achievement}</strong><p>${achievementData.personName}</p><p>${achievementData.description}</p>`;

                achievementElement.appendChild(imageElement);
                achievementElement.appendChild(textElement);
                achievementElement.appendChild(personElement);
                achievementElement.appendChild(descriptionElement);

                // Разрешаем промис после создания элемента
                resolve(achievementElement);
            };
        });
    }
});
