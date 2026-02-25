const breedSelect = document.getElementById('breed-select');
const searchInput = document.getElementById('search-breed');
const dogGrid = document.getElementById('dog-grid');

let allBreeds = []; // Stocke toutes les races pour le filtrage

//Récuparation des races de chiens depuis l'API Dog CEO
async function loadBreeds() {
    try {
        const response = await fetch('https://dog.ceo/api/breeds/list/all');
        const data = await response.json();
        
        // On extrait les noms des races et on les stocke dans allBreeds
        allBreeds = Object.keys(data.message);
        displayBreeds(allBreeds);
    } catch (error) {
        console.error("Erreur races:", error);
    }
}

// Afficher les races dans le select et dans le champ de recherche 
function displayBreeds(breeds) {
    breedSelect.innerHTML = '<option value="">-- Choisissez une race --</option>';
    breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed;
        option.textContent = breed.charAt(0).toUpperCase() + breed.slice(1);
        breedSelect.appendChild(option);
    });
}

// Filtrer les races en fonction de la saisie dans le champ de recherche
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = allBreeds.filter(breed => breed.toLowerCase().includes(term));
    displayBreeds(filtered);
});

// Charger les images des chiens lorsque l'utilisateur sélectionne une race
breedSelect.addEventListener('change', async (e) => {
    const breed = e.target.value;
    if (!breed) return;

    dogGrid.innerHTML = '<p>Chargement...</p>';
    
    try {
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
        const data = await response.json();
        
       // Afficher les 12 premières images de la race sélectionnée
        const images = data.message.slice(0, 12);
        
        dogGrid.innerHTML = ''; // On vide le message de chargement
        images.forEach(imgUrl => { // On crée une balise img pour chaque image et on l'ajoute à la grille
            const img = document.createElement('img');
            img.src = imgUrl;
            img.alt = breed;
            dogGrid.appendChild(img);
        });
    } catch (error) {
        dogGrid.innerHTML = '<p>Erreur lors du chargement des images.</p>';
    }
});

loadBreeds();