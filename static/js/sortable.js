document.addEventListener("DOMContentLoaded", function() {
    const apiUrl = "https://raw.githubusercontent.com/akabab/superhero-api/0.2.0/api/all.json";
    const selectElement = document.getElementById("number-items");
    const dataInfoElement = document.getElementById("hero-info");
    const page = document.getElementById("page");
    const searchBar = document.getElementById("searchBar");
    let nbHeros = 0;

    let filterSens = 0;

    let allHeroes = [];
    let filteredHeroes = [];


    //Function to load API in data
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

    //Function that takes the correct slice of data display
    function updateDisplayedHeroes(dataNumberMin, dataNumber) {
        const heroesToDisplay = filteredHeroes.slice(dataNumberMin, dataNumber);
        displayHeroes(heroesToDisplay);
    }

    //Function that displays data
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

            const genderCell = document.createElement("td");
            genderCell.textContent = hero.appearance.gender;
            heroRow.appendChild(genderCell);

            const heightCell = document.createElement("td");
            heightCell.textContent = hero.appearance.height;
            heroRow.appendChild(heightCell);

            const weightCell = document.createElement("td");
            weightCell.textContent = hero.appearance.weight;
            heroRow.appendChild(weightCell);

            const placeOfBirthCell = document.createElement("td");
            placeOfBirthCell.textContent = hero.biography.placeOfBirth;
            heroRow.appendChild(placeOfBirthCell);

            const alignmentCell = document.createElement("td");
            alignmentCell.textContent = hero.biography.alignment;
            heroRow.appendChild(alignmentCell);

            dataInfoElement.appendChild(heroRow);
        });
    }

    //Function that filter data from the search bar
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

    //Function that sorts data based on stats
    function filterStats(stats){
        switch (stats){
            case "name":
                if (filterSens === 1){
                    filterSens = 2;
                }else{
                    filterSens = 1;
                }
                filteredHeroes.sort((a, b) => {
                    const fullNameA = a.name.toLowerCase();
                    const fullNameB = b.name.toLowerCase();
                    if (fullNameA < fullNameB) return -1;
                    if (fullNameA > fullNameB) return 1;
                    return 0;
                });
                break;
            case "fullName":
                if (filterSens === 3){
                    filterSens = 4;
                }else{
                    filterSens = 3;
                }
                filteredHeroes.sort((a, b) => {
                    const fullNameA = a.biography.fullName.toLowerCase();
                    const fullNameB = b.biography.fullName.toLowerCase();
                    if (filterSens%2 != 0){   
                        if (!fullNameA && fullNameB) return 1;
                        if (fullNameA && !fullNameB) return -1;
                        if (!fullNameA && !fullNameB) return 0;
                    }
                    if (fullNameA < fullNameB) return -1;
                    if (fullNameA > fullNameB) return 1;
                    return 0;
                });
                break;
            case "intelligence":
                if (filterSens === 5){
                    filterSens = 6;
                }else{
                    filterSens = 5;
                }
                filteredHeroes.sort((a, b) => a.powerstats.intelligence - b.powerstats.intelligence);
                break;
            case "strength":
                if (filterSens === 7){
                    filterSens = 8;
                }else{
                    filterSens = 7;
                }
                filteredHeroes.sort((a, b) => a.powerstats.strength - b.powerstats.strength);
                break;
            case "speed":
                if (filterSens === 9){
                    filterSens = 10;
                }else{
                    filterSens = 9;
                }
                filteredHeroes.sort((a, b) => a.powerstats.speed - b.powerstats.speed);
                break;
            case "race":
                if (filterSens === 11){
                    filterSens = 12;
                }else{
                    filterSens = 11;
                }
                filteredHeroes.sort((a, b) => {
                    if (filterSens%2 != 0){
                        if (a.appearance.race === null) return 1;
                        if (b.appearance.race === null) return -1;
                        if (a.appearance.race === null && b.appearance.race === null) return 0;
                    }else{
                        if (a.appearance.race === null) return -1;
                        if (b.appearance.race === null) return 1;
                        if (a.appearance.race === null && b.appearance.race === null) return 0;
                    }
                    const fullNameA = a.appearance.race.toLowerCase();
                    const fullNameB = b.appearance.race.toLowerCase();
                    if (filterSens%2 != 0){   
                        if (!fullNameA && fullNameB) return 1;
                        if (fullNameA && !fullNameB) return -1;
                        if (!fullNameA && !fullNameB) return 0;
                    }
                    if (fullNameA < fullNameB) return -1;
                    if (fullNameA > fullNameB) return 1;
                    return 0;
                });
                break;
            case "gender":
                if (filterSens === 13){
                    filterSens = 14;
                }else{
                    filterSens = 13;
                }
                filteredHeroes.sort((a, b) => {
                    if (filterSens%2 != 0){
                        if (a.appearance.gender === "-") return 1;
                        if (b.appearance.gender === "-") return -1;
                        if (a.appearance.gender === "-" && b.appearance.gender === "-") return 0;
                    }
                    const fullNameA = a.appearance.gender.toLowerCase();
                    const fullNameB = b.appearance.gender.toLowerCase();
                    if (filterSens%2 != 0){   
                        if (!fullNameA && fullNameB) return 1;
                        if (fullNameA && !fullNameB) return -1;
                        if (!fullNameA && !fullNameB) return 0;
                    }
                    if (fullNameA < fullNameB) return -1;
                    if (fullNameA > fullNameB) return 1;
                    return 0;
                });
                break;
            case "height":
                if (filterSens === 15){
                    filterSens = 16;
                }else{
                    filterSens = 15;
                }
                filteredHeroes.sort((a, b) => {
                    if (filterSens%2 != 0){
                        if (a.appearance.height[0] === "-") return 1;
                        if (b.appearance.height[0] === "-") return -1;
                        if (a.appearance.height[0] === "-" && b.appearance.height[0] === "-") return 0;
                    }
                    let fullNameA = a.appearance.height[0];
                    let fullNameB = b.appearance.height[0];
                    for (let i = 0; i < fullNameA.length-1; i++){
                        if (fullNameA[i] === "'"){
                            fullNameA[i] = ".";
                        }
                    }
                    if (fullNameA[fullNameA.length-1] === "'"){
                        fullNameA = fullNameA.slice(0, -1);
                    }
                    fullNameA = parseFloat(fullNameA);
                    for (let i = 0; i < fullNameB.length-1; i++){
                        if (fullNameB[i] === "'"){
                            fullNameB[i] = ".";
                        }
                    }
                    if (fullNameB[fullNameB.length-1] === "'"){
                        fullNameB = fullNameB.slice(0, -1);
                    }
                    fullNameB = parseFloat(fullNameB);
                    if (filterSens%2 != 0){   
                        if (!fullNameA && fullNameB) return 1;
                        if (fullNameA && !fullNameB) return -1;
                        if (!fullNameA && !fullNameB) return 0;
                    }
                    if (fullNameA < fullNameB) return -1;
                    if (fullNameA > fullNameB) return 1;
                    return 0;
                });
                break;
            case "weight":
                if (filterSens === 17){
                    filterSens = 18;
                }else{
                    filterSens = 17;
                }
                filteredHeroes.sort((a, b) => {
                    if (filterSens%2 != 0){
                        if (a.appearance.weight[0] === "- lb") return 1;
                        if (b.appearance.weight[0] === "- lb") return -1;
                        if (a.appearance.weight[0] === "- lb" && b.appearance.weight[0] === "- lb") return 0;
                    }
                    const fullNameA = parseInt(a.appearance.weight[0].slice(0, -3).toLowerCase(), 10);
                    const fullNameB = parseInt(b.appearance.weight[0].slice(0, -3).toLowerCase(), 10);
                    if (filterSens%2 != 0){   
                        if (!fullNameA && fullNameB) return 1;
                        if (fullNameA && !fullNameB) return -1;
                        if (!fullNameA && !fullNameB) return 0;
                    }
                    if (fullNameA < fullNameB) return -1;
                    if (fullNameA > fullNameB) return 1;
                    return 0;
                });
                break;
            case "place-of-birth":
                if (filterSens === 19){
                    filterSens = 20;
                }else{
                    filterSens = 19;
                }
                filteredHeroes.sort((a, b) => {
                    if (filterSens%2 != 0){
                        if (a.biography.placeOfBirth === "-") return 1;
                        if (b.biography.placeOfBirth === "-") return -1;
                        if (a.biography.placeOfBirth === "-" && b.biography.placeOfBirth === "-") return 0;
                    }
                    const fullNameA = a.biography.placeOfBirth.toLowerCase();
                    const fullNameB = b.biography.placeOfBirth.toLowerCase();
                    if (filterSens%2 != 0){   
                        if (!fullNameA && fullNameB) return 1;
                        if (fullNameA && !fullNameB) return -1;
                        if (!fullNameA && !fullNameB) return 0;
                    }
                    if (fullNameA < fullNameB) return -1;
                    if (fullNameA > fullNameB) return 1;
                    return 0;
                });
                break;
            case "alignment":
                if (filterSens === 21){
                    filterSens = 22;
                }else{
                    filterSens = 21;
                }
                filteredHeroes.sort((a, b) => {
                    if (filterSens%2 != 0){
                        if (a.biography.alignment === "-") return 1;
                        if (b.biography.alignment === "-") return -1;
                        if (a.biography.alignment === "-" && b.biography.alignment === "-") return 0;
                    }
                    const fullNameA = a.biography.alignment.toLowerCase();
                    const fullNameB = b.biography.alignment.toLowerCase();
                    if (filterSens%2 != 0){   
                        if (!fullNameA && fullNameB) return 1;
                        if (fullNameA && !fullNameB) return -1;
                        if (!fullNameA && !fullNameB) return 0;
                    }
                    if (fullNameA < fullNameB) return -1;
                    if (fullNameA > fullNameB) return 1;
                    return 0;
                });
                break;
        }
        let dataNumber = selectElement.value === "all" ? nbHeros : parseInt(selectElement.value);
        if (filterSens%2 === 0){
            filteredHeroes.reverse();
        }
        updateDisplayedHeroes(0, dataNumber);
    }

    //Function which listens to the select items and which displays the right amount of information
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

    //Function that listens for "th" tags and calls the stats filter
    document.querySelectorAll("th[data-column]").forEach(header => {
        header.addEventListener("click", function() {
            const column = header.getAttribute("data-column");
            filterStats(column);
        });
    });

    //page initialization
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
