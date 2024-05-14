document.addEventListener("DOMContentLoaded", function() {
    const apiUrl = "https://raw.githubusercontent.com/akabab/superhero-api/0.2.0/api/all.json";
    const selectElement = document.getElementById("number-items");
    const dataInfoElement = document.getElementById("hero-info");

    function loadData(dataNumber) {
        fetch(apiUrl)
        .then(response => response.json())
        .then(data => {

            const sample = data.slice(0, dataNumber);

            dataInfoElement.innerHTML = "";

            sample.forEach(hero => {
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

                document.getElementById("hero-info").appendChild(heroElement);
            });
        })
        .catch(error => {
            console.error("Une erreur s'est produite lors de la récupération des données:", error);
        });
    }
    selectElement.addEventListener("change", function() {
        if (selectElement.value === "all"){
            loadData(731);
        }else{
            const dataNumber = parseInt(selectElement.value);
            loadData(dataNumber);
        }
    });
    const initialData = parseInt(selectElement.value);
    loadData(initialData);
});
