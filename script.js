const input = document.getElementById("cityInput");
const button = document.querySelector("button");
const gpsDiv = document.getElementById("gps");
const detailsDiv = document.getElementById("details");

async function fetchCoordinates(city) {
    try {
        const url = `https://nominatim.openstreetmap.org/search?q=${city}&format=json&addressdetails=1&limit=1`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.length === 0) {
            throw new Error("Ville non trouvée !");
        }
        const lat = data[0].lat;
        const lon = data[0].lon;
        gpsDiv.textContent = `Coordonnées GPS : ${lat}, ${lon}`; 
        detailsDiv.textContent = "Coordonnées récupérées."
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
