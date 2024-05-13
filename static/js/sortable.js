document.addEventListener("DOMContentLoaded", function() {
    const apiUrl = "https://raw.githubusercontent.com/akabab/superhero-api/0.2.0/api/all.json";

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            data.forEach(hero => {
                const heroElement = document.createElement("div");
                heroElement.classList.add("hero");

                const nameElement = document.createElement("h2");
                nameElement.textContent = hero.name;
                heroElement.appendChild(nameElement);

                const powerstatsElement = document.createElement("p");
                powerstatsElement.textContent = `Intelligence: ${hero.powerstats.intelligence}, Strength: ${hero.powerstats.strength}, Speed: ${hero.powerstats.speed}`;
                heroElement.appendChild(powerstatsElement);

                const imageElement = document.createElement("img");
                imageElement.src = hero.images.md;
                heroElement.appendChild(imageElement);

                document.getElementById("hero-info").appendChild(heroElement);
            });
        })
        .catch(error => {
            console.error("Une erreur s'est produite lors de la récupération des données:", error);
        });
});
