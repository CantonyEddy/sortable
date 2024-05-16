document.addEventListener("DOMContentLoaded", function() {
    const apiUrl = "https://raw.githubusercontent.com/akabab/superhero-api/0.2.0/api/all.json";
    const selectElement = document.getElementById("number-items");
    const dataInfoElement = document.getElementById("hero-info");
    const searchBar = document.getElementById("searchBar");

    let allHeroes = [];
    let displayedHeroes = [];

    // Charger et afficher les données
    function loadData(dataNumber) {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                allHeroes = data;
                updateDisplayedHeroes(dataNumber);
            })
            .catch(error => {
                console.error("Une erreur s'est produite lors de la récupération des données:", error);
            });
    }

    // Mettre à jour les héros affichés en fonction de la sélection et de la recherche
    function updateDisplayedHeroes(dataNumber) {
        if (dataNumber === 731) {
            displayedHeroes = allHeroes;
        } else {
            displayedHeroes = allHeroes.slice(0, dataNumber);
        }
        filterHeroes();
    }

    // Afficher les superhéros
    function displayHeroes(heroes) {
        dataInfoElement.innerHTML = "";
        heroes.forEach(hero => {
            const heroElement = document.createElement("div");
            heroElement.classList.add("hero");

            const imageElement = document.createElement("img");
            imageElement.src = hero.images.md;
            heroElement.appendChild(imageElement);

            const nameElement = document.createElement("h2");
            nameElement.textContent = hero.name;
            heroElement.appendChild(nameElement);

            const fullNameElement = document.createElement("h3");
            fullNameElement.textContent = hero.biography.fullName;
            heroElement.appendChild(fullNameElement);

            const powerstatsElement = document.createElement("p");
            powerstatsElement.textContent = `Intelligence: ${hero.powerstats.intelligence}, Strength: ${hero.powerstats.strength}, Speed: ${hero.powerstats.speed}`;
            heroElement.appendChild(powerstatsElement);

            const raceElement = document.createElement("p");
            raceElement.textContent = `Race: ${hero.appearance.race}`;
            heroElement.appendChild(raceElement);

            dataInfoElement.appendChild(heroElement);
        });
    }

    // Filtrer les superhéros selon la recherche
    function filterHeroes() {
        const searchTerm = searchBar.value.toLowerCase();
        const filteredHeroes = allHeroes.filter(hero => {
            return hero.name.toLowerCase().includes(searchTerm) ||
                   (hero.biography.fullName && hero.biography.fullName.toLowerCase().includes(searchTerm)) ||
                   (hero.appearance.race && hero.appearance.race.toLowerCase().includes(searchTerm));
        });
        displayHeroes(filteredHeroes);
    }

    // Écouter les changements de la liste déroulante
    selectElement.addEventListener("change", function() {
        const dataNumber = selectElement.value === "all" ? 731 : parseInt(selectElement.value);
        updateDisplayedHeroes(dataNumber);
    });

    // Écouter les saisies dans la barre de recherche
    searchBar.addEventListener("input", filterHeroes);

    // Charger les données initiales
    const initialData = selectElement.value === "all" ? 731 : parseInt(selectElement.value);
    loadData(initialData);
});