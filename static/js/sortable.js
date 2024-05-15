document.addEventListener("DOMContentLoaded", function() {
    const apiUrl = "https://raw.githubusercontent.com/akabab/superhero-api/0.2.0/api/all.json";
    const selectElement = document.getElementById("number-items");
    const dataInfoElement = document.getElementById("hero-info");
    const page = document.getElementById("page");
    let nbHeros = 0;

    function loadData(dataNumberMin, dataNumberMax) {
        fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            nbHeros = data.length;
            const sample = data.slice(dataNumberMin, dataNumberMax);

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

                const idElement = document.createElement("p");
                idElement.textContent = `id: ${hero.id}`;
                heroElement.appendChild(idElement);

                document.getElementById("hero-info").appendChild(heroElement);
            });
        })
        .catch(error => {
            console.error("Une erreur s'est produite lors de la récupération des données:", error);
        });
    }

    selectElement.addEventListener("change", function() {
        if (selectElement.value === "all"){
            loadData(0, nbHeros);
            page.innerHTML = "";
        }else{
            const dataNumber = parseInt(selectElement.value);
            loadData(0, dataNumber);
            const coucou = Math.ceil(nbHeros/dataNumber);
            console.log(coucou, nbHeros);
            page.innerHTML = "";
            for (var i = 0; i < coucou; i++){
                const newButton = document.createElement("button");
                newButton.textContent = `${i+1}`;
                page.appendChild(newButton);

                newButton.addEventListener("click", function(event) {
                    const buttonText = event.target.textContent;
                    loadData(buttonText*dataNumber-dataNumber, buttonText*dataNumber);
                });
            }
        }
    });
    const initialData = parseInt(selectElement.value);
    loadData(0, initialData);
    for (var i = 0; i < 37; i++){
        const newButton = document.createElement("button");
        newButton.textContent = `${i+1}`;
        page.appendChild(newButton);

        newButton.addEventListener("click", function(event) {
            const buttonText = event.target.textContent;
            loadData(buttonText*20-20, buttonText*20);
        });
    }
});
