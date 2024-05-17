document.addEventListener("DOMContentLoaded", function() {
    const apiUrl = "https://raw.githubusercontent.com/akabab/superhero-api/0.2.0/api/all.json";
    const selectElement = document.getElementById("number-items");
    const dataInfoElement = document.getElementById("hero-info");
    const page = document.getElementById("page");
    const searchBar = document.getElementById("searchBar");
    let nbHeros = 0;

    let allHeroes = [];
    let filteredHeroes = [];

    function loadData() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                nbHeros = data.length;
                allHeroes = data;
                filterHeroes();
            })
            .catch(error => {
                console.error("Une erreur s'est produite lors de la récupération des données:", error);
            });
    }

    function updateDisplayedHeroes(dataNumberMin, dataNumber) {
        const heroesToDisplay = filteredHeroes.slice(dataNumberMin, dataNumber);
        displayHeroes(heroesToDisplay);
    }

    function displayHeroes(heroes) {
        dataInfoElement.innerHTML = "";

        heroes.forEach(hero => {
            const heroRow = document.createElement("tr");

            const imageCell = document.createElement("td");
            const imageElement = document.createElement("img");
            imageElement.src = hero.images.xs;
            imageElement.alt = hero.name;
            imageElement.style.width = "50px";
            imageCell.appendChild(imageElement);
            heroRow.appendChild(imageCell);

            const nameCell = document.createElement("td");
            nameCell.textContent = hero.name;
            heroRow.appendChild(nameCell);

            const fullNameCell = document.createElement("td");
            fullNameCell.textContent = hero.biography.fullName;
            heroRow.appendChild(fullNameCell);

            const intelligenceCell = document.createElement("td");
            intelligenceCell.textContent = hero.powerstats.intelligence;
            heroRow.appendChild(intelligenceCell);

            const strengthCell = document.createElement("td");
            strengthCell.textContent = hero.powerstats.strength;
            heroRow.appendChild(strengthCell);

            const speedCell = document.createElement("td");
            speedCell.textContent = hero.powerstats.speed;
            heroRow.appendChild(speedCell);

            const raceCell = document.createElement("td");
            raceCell.textContent = hero.appearance.race;
            heroRow.appendChild(raceCell);

            dataInfoElement.appendChild(heroRow);
        });
    }

    function filterHeroes() {
        const searchTerm = searchBar.value.toLowerCase();
        filteredHeroes = allHeroes.filter(hero => {
            return hero.name.toLowerCase().includes(searchTerm) ||
                   (hero.biography.fullName && hero.biography.fullName.toLowerCase().includes(searchTerm)) ||
                   (hero.appearance.race && hero.appearance.race.toLowerCase().includes(searchTerm));
        });
        const dataNumber = selectElement.value === "all" ? nbHeros : parseInt(selectElement.value);
        updateDisplayedHeroes(0, dataNumber);
    }

    selectElement.addEventListener("change", function() {
        const dataNumber = selectElement.value === "all" ? nbHeros : parseInt(selectElement.value);
        updateDisplayedHeroes(0, dataNumber);

        if (selectElement.value !== "all") {
            const totalPages = Math.ceil(filteredHeroes.length / dataNumber);
            page.innerHTML = "";
            for (let i = 0; i < totalPages; i++) {
                const newButton = document.createElement("button");
                newButton.textContent = `${i + 1}`;
                page.appendChild(newButton);

                newButton.addEventListener("click", function(event) {
                    const buttonText = parseInt(event.target.textContent);
                    updateDisplayedHeroes((buttonText - 1) * dataNumber, buttonText * dataNumber);
                });
            }
        } else {
            page.innerHTML = "";
        }
    });

    searchBar.addEventListener("input", filterHeroes);

    loadData();
    const dataNumber = selectElement.value === "all" ? nbHeros : parseInt(selectElement.value);
        for (let i = 0; i < 29; i++) {
            const newButton = document.createElement("button");
            newButton.textContent = `${i + 1}`;
            page.appendChild(newButton);

            newButton.addEventListener("click", function(event) {
                const buttonText = parseInt(event.target.textContent);
                updateDisplayedHeroes((buttonText - 1) * dataNumber, buttonText * dataNumber);
            });
        }
});
