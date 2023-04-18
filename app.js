
let pokemonID = 1;
const typesContainer = document.querySelector('.types');
const inputPokeID = document.querySelector('#pokemon-id');
const inputPokeName = document.querySelector('#pokemon-name');

inputPokeName.addEventListener('change', (e) => {
    if (e.target.value !== '') {
        fetch('https://api-pokemon-fr.vercel.app/api/v1/pokemon/' + e.target.value)
            .then((response) => response.json())
            .then((data) => {
                pokemonID = data.pokedexId;
                displayPokemon();
                e.target.value = ''
            });
    }
});



inputPokeID.addEventListener('change', (e) => {
    if (Number.isInteger(parseInt(e.target.value))) {
        pokemonID = parseInt(e.target.value);
        displayPokemon();
        e.target.value = ''
    }
});



const fetchAPI = async () => {

    const response = await fetch('https://api-pokemon-fr.vercel.app/api/v1/pokemon/' + pokemonID);
    const data = await response.json();
    console.log(data);
    return data;
}

function incrementID() {
    if (pokemonID < 900) {
        pokemonID++;
        displayPokemon();
        
    }
}

function decrementID() {
    if (pokemonID > 1) {
        pokemonID--;
        displayPokemon();
    }
}

function displayPokemon() {
    fetchAPI().then((data) => {
        document.getElementById('pokemon-name').placeholder = data.name.fr;
        document.getElementById('pokemon-id').placeholder = data.pokedexId.toString().padStart(3, '0');
        document.getElementById('pokemon-img').src = data.sprites.regular;
        document.getElementById('pokemon-hp').innerHTML = data.stats.hp;
        document.getElementById('pokemon-attack').innerHTML = data.stats.atk;
        document.getElementById('pokemon-defense').innerHTML = data.stats.def;
        document.getElementById('pokemon-speed').innerHTML = data.stats.vit;
    });
}

displayPokemon();