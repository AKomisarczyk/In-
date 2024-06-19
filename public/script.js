// Pobieramy formularz dodawania posiłku
const mealForm = document.getElementById('add-meal-form');

// Pobieramy elementy do ustawiania i wyświetlania kalorii
const dailyCalorieGoalInput = document.getElementById('daily-calorie-goal');
const calorieApple = document.getElementById('calorie-apple');
const caloriesLeftElement = document.getElementById('calories-left');
const caloriesConsumedElement = document.getElementById('calories-consumed');
const selectedDateInput = document.getElementById('selected-date');

const breakfastCalories = document.getElementById('breakfast-calories');
const lunchCalories = document.getElementById('lunch-calories');
const dinnerCalories = document.getElementById('dinner-calories');
const snacksCalories = document.getElementById('snacks-calories');

const proteinApple = document.getElementById('protein-apple');
const proteinLeftElement = document.getElementById('protein-left');
const proteinConsumedElement = document.getElementById('protein-consumed');
const proteinGoalInput = document.getElementById('protein-goal');

const carbsApple = document.getElementById('carbs-apple');
const carbsLeftElement = document.getElementById('carbs-left');
const carbsConsumedElement = document.getElementById('carbs-consumed');
const carbsGoalInput = document.getElementById('carbs-goal');

const fatApple = document.getElementById('fat-apple');
const fatLeftElement = document.getElementById('fat-left');
const fatConsumedElement = document.getElementById('fat-consumed');
const fatGoalInput = document.getElementById('fat-goal');

let dailyCalorieGoal = 0;
let caloriesConsumed = 0;
let breakfast = 0;
let lunch = 0;
let dinner = 0;
let snacks = 0;
let selectedDate = new Date().toISOString().split('T')[0];

let proteinConsumed = 0;
let carbsConsumed = 0;
let fatConsumed = 0;

let proteinGoal = 0;
let carbsGoal = 0;
let fatGoal = 0;

const calorieData = {};
let historyData = JSON.parse(localStorage.getItem('historyData')) || [];

// Obsługa ustalania celu kalorii
function setDailyCalorieGoal() {
    dailyCalorieGoal = parseInt(dailyCalorieGoalInput.value);
    updateCalorieSummary();
}

// Obsługa ustalania celu białka
function setProteinGoal() {
    proteinGoal = parseInt(proteinGoalInput.value);
    updateCalorieSummary();
}

// Obsługa ustalania celu węglowodanów
function setCarbsGoal() {
    carbsGoal = parseInt(carbsGoalInput.value);
    updateCalorieSummary();
}

// Obsługa ustalania celu tłuszczu
function setFatGoal() {
    fatGoal = parseInt(fatGoalInput.value);
    updateCalorieSummary();
}

// Obsługa dodawania posiłku
mealForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Pobieramy dane z formularza
    const mealName = document.getElementById('meal-name').value;
    const mealType = document.getElementById('meal-type').value;
    const calories = parseInt(document.getElementById('calories').value);
    const protein = parseFloat(document.getElementById('protein').value);
    const carbs = parseFloat(document.getElementById('carbs').value);
    const fat = parseFloat(document.getElementById('fat').value);

    // Dodajemy kalorie do odpowiedniego posiłku
    switch (mealType) {
        case 'breakfast':
            breakfast += calories;
            breakfastCalories.textContent = breakfast;
            break;
        case 'lunch':
            lunch += calories;
            lunchCalories.textContent = lunch;
            break;
        case 'dinner':
            dinner += calories;
            dinnerCalories.textContent = dinner;
            break;
        case 'snacks':
            snacks += calories;
            snacksCalories.textContent = snacks;
            break;
    }

    // Aktualizujemy całkowitą ilość spożytych kalorii i makroskładników
    caloriesConsumed += calories;
    proteinConsumed += protein;
    carbsConsumed += carbs;
    fatConsumed += fat;
    updateCalorieSummary();

    // Resetujemy formularz
    mealForm.reset();
});

// Funkcja ustawiająca wybrany dzień
function setSelectedDate() {
    selectedDate = selectedDateInput.value;
    if (calorieData[selectedDate]) {
        dailyCalorieGoal = calorieData[selectedDate].goal;
        caloriesConsumed = calorieData[selectedDate].consumed;
        breakfast = calorieData[selectedDate].breakfast;
        lunch = calorieData[selectedDate].lunch;
        dinner = calorieData[selectedDate].dinner;
        snacks = calorieData[selectedDate].snacks;
        proteinConsumed = calorieData[selectedDate].protein;
        carbsConsumed = calorieData[selectedDate].carbs;
        fatConsumed = calorieData[selectedDate].fat;
        proteinGoal = calorieData[selectedDate].proteinGoal;
        carbsGoal = calorieData[selectedDate].carbsGoal;
        fatGoal = calorieData[selectedDate].fatGoal;
    } else {
        dailyCalorieGoal = 0;
        caloriesConsumed = 0;
        breakfast = 0;
        lunch = 0;
        dinner = 0;
        snacks = 0;
        proteinConsumed = 0;
        carbsConsumed = 0;
        fatConsumed = 0;
        proteinGoal = 0;
        carbsGoal = 0;
        fatGoal = 0;
    }
    updateCalorieSummary();
}

// Funkcja aktualizująca podsumowanie kalorii i makroskładników
function updateCalorieSummary() {
    calorieData[selectedDate] = {
        goal: dailyCalorieGoal,
        consumed: caloriesConsumed,
        breakfast: breakfast,
        lunch: lunch,
        dinner: dinner,
        snacks: snacks,
        protein: proteinConsumed,
        carbs: carbsConsumed,
        fat: fatConsumed,
        proteinGoal: proteinGoal,
        carbsGoal: carbsGoal,
        fatGoal: fatGoal
    };

    const caloriesLeft = dailyCalorieGoal - caloriesConsumed;
    caloriesLeftElement.textContent = caloriesLeft > 0 ? caloriesLeft : 0;
    caloriesConsumedElement.textContent = caloriesConsumed;

    const fillPercentage = (caloriesConsumed / dailyCalorieGoal) * 100;

    if (fillPercentage <= 100) {
        calorieApple.style.background = `conic-gradient(#00ff00 ${fillPercentage}%, #e0e0e0 ${fillPercentage}%)`;
    } else {
        calorieApple.style.background = `conic-gradient(#00ff00 100%, #e0e0e0 0%)`;
    }

    // Aktualizujemy makroskładniki
    const proteinFill = (proteinConsumed / proteinGoal) * 100;
    const carbsFill = (carbsConsumed / carbsGoal) * 100;
    const fatFill = (fatConsumed / fatGoal) * 100;

    if (proteinFill <= 100) {
        proteinApple.style.background = `conic-gradient(#ff6347 ${proteinFill}%, #e0e0e0 ${proteinFill}%)`;
    } else {
        proteinApple.style.background = `conic-gradient(#ff6347 100%, #e0e0e0 0%)`;
    }

    if (carbsFill <= 100) {
        carbsApple.style.background = `conic-gradient(#ffa500 ${carbsFill}%, #e0e0e0 ${carbsFill}%)`;
    } else {
        carbsApple.style.background = `conic-gradient(#ffa500 100%, #e0e0e0 0%)`;
    }

    if (fatFill <= 100) {
        fatApple.style.background = `conic-gradient(#1e90ff ${fatFill}%, #e0e0e0 ${fatFill}%)`;
    } else {
        fatApple.style.background = `conic-gradient(#1e90ff 100%, #e0e0e0 0%)`;
    }

    proteinLeftElement.textContent = proteinGoal - proteinConsumed > 0 ? proteinGoal - proteinConsumed : 0;
    proteinConsumedElement.textContent = proteinConsumed;

    carbsLeftElement.textContent = carbsGoal - carbsConsumed > 0 ? carbsGoal - carbsConsumed : 0;
    carbsConsumedElement.textContent = carbsConsumed;

    fatLeftElement.textContent = fatGoal - fatConsumed > 0 ? fatGoal - fatConsumed : 0;
    fatConsumedElement.textContent = fatConsumed;

    breakfastCalories.textContent = breakfast;
    lunchCalories.textContent = lunch;
    dinnerCalories.textContent = dinner;
    snacksCalories.textContent = snacks;
}

// Funkcja kończąca dzień i zapisująca dane do historii
function endDay() {
    const dayData = {
        date: selectedDate,
        goal: dailyCalorieGoal,
        consumed: caloriesConsumed,
        breakfast: breakfast,
        lunch: lunch,
        dinner: dinner,
        snacks: snacks,
        protein: proteinConsumed,
        carbs: carbsConsumed,
        fat: fatConsumed,
        proteinGoal: proteinGoal,
        carbsGoal: carbsGoal,
        fatGoal: fatGoal
    };

    // Sprawdzamy, czy istnieją dane dla wybranego dnia
    const existingDayIndex = historyData.findIndex(entry => entry.date === selectedDate);

    if (existingDayIndex !== -1) {
        // Jeśli dane dla tego dnia już istnieją, aktualizujemy je
        historyData[existingDayIndex] = dayData;
    } else {
        // Jeśli nie, dodajemy nowy wpis
        historyData.push(dayData);
    }

    localStorage.setItem('historyData', JSON.stringify(historyData));
    alert('Dzień zakończony i zapisany do historii.');
}
