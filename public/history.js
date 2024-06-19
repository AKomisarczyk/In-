document.addEventListener('DOMContentLoaded', function() {
    const historyList = document.getElementById('history-list');
    const historyData = JSON.parse(localStorage.getItem('historyData')) || [];

    historyData.forEach(dayData => {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'history-day';

        const dateP = document.createElement('p');
        dateP.textContent = `Data: ${dayData.date}`;
        dayDiv.appendChild(dateP);

        const goalP = document.createElement('p');
        goalP.textContent = `Cel kalorii: ${dayData.goal}`;
        dayDiv.appendChild(goalP);

        const consumedP = document.createElement('p');
        consumedP.textContent = `Spożyte kalorie: ${dayData.consumed}`;
        dayDiv.appendChild(consumedP);

        const proteinP = document.createElement('p');
        proteinP.textContent = `Spożyte białko: ${dayData.protein}`;
        dayDiv.appendChild(proteinP);

        const carbsP = document.createElement('p');
        carbsP.textContent = `Spożyte węglowodany: ${dayData.carbs}`;
        dayDiv.appendChild(carbsP);

        const fatP = document.createElement('p');
        fatP.textContent = `Spożyte tłuszcze: ${dayData.fat}`;
        dayDiv.appendChild(fatP);

        const breakfastP = document.createElement('p');
        breakfastP.textContent = `Śniadanie: ${dayData.breakfast}`;
        dayDiv.appendChild(breakfastP);

        const lunchP = document.createElement('p');
        lunchP.textContent = `Lunch: ${dayData.lunch}`;
        dayDiv.appendChild(lunchP);

        const dinnerP = document.createElement('p');
        dinnerP.textContent = `Obiad: ${dayData.dinner}`;
        dayDiv.appendChild(dinnerP);

        const snacksP = document.createElement('p');
        snacksP.textContent = `Przekąski: ${dayData.snacks}`;
        dayDiv.appendChild(snacksP);

        historyList.appendChild(dayDiv);
    });
});
