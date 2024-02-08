// Definir variables globales para los elementos y los datos JSON
let jsonData;
const dailyLink = document.getElementById("dailyLink");
const weeklyLink = document.getElementById("weeklyLink");
const monthlyLink = document.getElementById("monthlyLink");
const themeCardAll = document.querySelectorAll(".track-item");
const paraCurrent = document.querySelectorAll(".time");
const spanPrevious = document.querySelectorAll(".previous");

// Función para cargar el archivo JSON externo
async function loadData() {
  try {
    const response = await fetch('/data.json');
    jsonData = await response.json();

    // Llamar a la función para inicializar la interfaz con los datos cargados
    updateUI('weekly'); // Puedes cambiar 'weekly' por 'daily' o 'monthly' según tus necesidades iniciales

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Función para actualizar los datos según el intervalo de tiempo seleccionado
function updateData(timeframe) {
  jsonData.forEach((entry, i) => {
    const timeData = entry.timeframes[timeframe];

    paraCurrent[i].textContent = `${timeData.current}hrs`;
    spanPrevious[i].textContent = `Last ${timeframe} - ${timeData.previous}hrs`;
  });
}

// Event listeners para enlaces de tiempo
dailyLink.addEventListener('click', function (event) {
  changeActive(dailyLink, weeklyLink, monthlyLink);
  updateData('daily');
  event.preventDefault();
});

weeklyLink.addEventListener('click', function (event) {
  changeActive(weeklyLink, dailyLink, monthlyLink);
  updateData('weekly');
  event.preventDefault();
});

monthlyLink.addEventListener('click', function (event) {
  changeActive(monthlyLink, dailyLink, weeklyLink);
  updateData('monthly');
  event.preventDefault();
});
// Función para cambiar la clase activa entre los botones de tiempo
function changeActive(active, ...inactive) {
    active.classList.add('active');
    inactive.forEach(btn => btn.classList.remove('active'));
  }

// Función para inicializar la interfaz de usuario con datos predeterminados
function updateUI(timeframe) {
  updateData(timeframe);
  changeActive(weeklyLink, dailyLink, monthlyLink); // Predeterminado en 'Weekly'
}

// Llamar a la función para cargar el archivo JSON
loadData();
