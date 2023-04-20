
let pokemonID = 1;
const typesContainer = document.querySelector('.types');
const inputPokeID = document.querySelector('#pokemon-id');
const inputPokeName = document.querySelector('#pokemon-name');
const currentColor = "'rgb(' + typeColors[data.types[0].name][0] + ', ' + typeColors[data.types[0].name][1] + ', ' + typeColors[data.types[0].name][2] + ')'"

const typeColors = {
    "Roche":     [182, 158,  49],
    "Spectre":    [112,  85, 155],
    "Acier":    [183, 185, 208],
    "Eau":    [100, 147, 235],
    "Plante":    [116, 203,  72],
    "Psy":  [251,  85, 132],
    "Glace":      [154, 214, 223],
    "Ténèbres":     [117,  87,  76],
    "Fée":    [230, 158, 172],
    "Normal":   [170, 166, 127],
    "Combat": [193,  34,  57],
    "Vol":   [168, 145, 236],
    "Poison":   [164,  62, 158],
    "Sol":   [222, 193, 107],
    "Insecte":      [167, 183,  35],
    "Feu":     [245, 125,  49],
    "Électrik": [249, 207,  48],
    "Dragon":   [112,  55, 255]
}

inputPokeName.addEventListener('change', (e) => {
    if (e.target.value !== '') {
        let pokeName = e.target.value;
        pokeName = pokeName.toLowerCase().split(" ").join("-");
        fetch('https://api-pokemon-fr.vercel.app/api/v1/pokemon/' + pokeName)
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
        document.getElementById('pokemon-type1').innerHTML = data.types[0].name;
        if (data.types[1]) {
            document.getElementById('pokemon-type2').innerHTML = data.types[1].name;
            document.getElementById('pokemon-type2').style.display = 'inline-block';
            document.getElementById('pokemon-type2').style.backgroundColor = 'rgba(' + typeColors[data.types[1].name][0] + ', ' + typeColors[data.types[1].name][1] + ', ' + typeColors[data.types[1].name][2] + ' , 0.9)';
        } else {
            document.getElementById('pokemon-type2').style.display = 'none';
        }
        document.querySelector('.bar-inner-hp').style.width = data.stats.hp + '%';
        document.querySelector('.bar-inner-atk').style.width = data.stats.atk + '%';
        document.querySelector('.bar-inner-def').style.width = data.stats.def + '%';
        document.querySelector('.bar-inner-vit').style.width = data.stats.vit + '%';
        document.querySelector('.bar-inner-hp').style.backgroundColor ='rgb(' + typeColors[data.types[0].name][0] + ', ' + typeColors[data.types[0].name][1] + ', ' + typeColors[data.types[0].name][2] + ')';
        document.querySelector('.bar-inner-atk').style.backgroundColor = 'rgb(' + typeColors[data.types[0].name][0] + ', ' + typeColors[data.types[0].name][1] + ', ' + typeColors[data.types[0].name][2] + ')';
        document.querySelector('.bar-inner-def').style.backgroundColor = 'rgb(' + typeColors[data.types[0].name][0] + ', ' + typeColors[data.types[0].name][1] + ', ' + typeColors[data.types[0].name][2] + ')';
        document.querySelector('.bar-inner-vit').style.backgroundColor = 'rgb(' + typeColors[data.types[0].name][0] + ', ' + typeColors[data.types[0].name][1] + ', ' + typeColors[data.types[0].name][2] + ')';
        document.querySelector('.pokedex').style.background = 'rgba(' + typeColors[data.types[0].name][0] + ', ' + typeColors[data.types[0].name][1] + ', ' + typeColors[data.types[0].name][2] + ', 0.9)';
        document.querySelector('.pokedex').style.boxShadow = '0 0 20px rgb(' + typeColors[data.types[0].name][0] + ', ' + typeColors[data.types[0].name][1] + ', ' + typeColors[data.types[0].name][2] + ')';
    });
}

displayPokemon();
