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
    for (var i = 0; i < 29; i++){
        const newButton = document.createElement("button");
        newButton.textContent = `${i+1}`;
        page.appendChild(newButton);

        newButton.addEventListener("click", function(event) {
            const buttonText = event.target.textContent;
            loadData(buttonText*20-20, buttonText*20);
        });
    }
});
