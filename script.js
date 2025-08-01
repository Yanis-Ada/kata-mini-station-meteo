const cityDiv = document.getElementById("city")
const input = document.getElementById("cityInput");
const button = document.querySelector("button");
const gpsDiv = document.getElementById("gps");
const detailsDiv = document.getElementById("details");
const temperatureDiv = document.getElementById("temperature")

async function fetchCoordinates(city) {
    try {
        const coordinatesUrl = `https://nominatim.openstreetmap.org/search?q=${city}&format=json&addressdetails=1&limit=1`;
        const response = await fetch(coordinatesUrl);
        const data = await response.json();
        const lat = data[0].lat;
        const lon = data[0].lon;
        cityDiv.textContent = `${city}`
        gpsDiv.textContent = `Coordonnées GPS : ${lat}, ${lon}`; 
        detailsDiv.textContent = "Coordonnées récupérées."

        fetchWeather(lat, lon)

        } catch (error) {
        gpsDiv.textContent = "";
        detailsDiv.textContent = `Erreur : ${error.message}`;
        console.error("Problème de récuperation de données", error)
      }
    }
    
    button.addEventListener("click", () => {
        const city = input.value.trim();
        if (city === "") {
            detailsDiv.textContent = "Merci de saisir un nom de ville.";
            gpsDiv.textContent = "";
            return;
        }
        gpsDiv.textContent = "";
        detailsDiv.textContent = "Chargement en cours...";
        
     fetchCoordinates(city);
    });

async function fetchWeather(lat, lon) {
    try {
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m`;
        const response = await fetch(weatherUrl);
        const data = await response.json();
        const temperature = data.current.temperature_2m;
        temperatureDiv.textContent += `${temperature} °C`;

    } catch (error) {
        detailsDiv.textContent += `Erreur météo : ${error.message}`;
        console.error("Problème de récupération météo", error);
    }
}

