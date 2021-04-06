const pokemon_container = document.getElementById('pokemon_container');
const search_bar = document.getElementById('search_bar');
const search_error = document.getElementById('search_error');

let timeout = null;
let next = "";

// These are all the colors I use for the background of each pokemon card
const type_colors = {
    normal:'#a8a878',
    fire:'#f08030',
    water:'#6890f0',
    grass:'#78c850',
    electric:'#f8d030',
    ice:'#98d8d8',
    fighting:'#c03028',
    poison:'#a040a0',
    ground:'#e0c068',
    flying:'#a890f0',
    psychic:'#f85888',
    bug:'#a8b820',
    rock:'#b8a038',
    ghost:'#705898',
    dark:'#705848',
    dragon:'#7038f8',
    steel:'#b8b8d0',
    fairy:'#f0b6bc'
}

// Uses the pokeAPI to get a limited amount within an offset (like a page)
const getAllPokemon = async (limit, offset) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`;

    try {
        const result = await fetch(url);

        if (result.ok) {
            const pokemon = await result.json();
            next = pokemon.next;
            
            for (let id = 0; id < pokemon.results.length; id++) {
                await getPokemon(pokemon.results[id].name);
            }
        } else {
            error_shake();
            search_error.textContent = `No results found for ${id}...`;
        }
    } catch(e) {
        search_error.textContent = e;
    }
}

// Uses the pokeAPI to get the Pokemon
const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    try {
        const result = await fetch(url);

        if (result.ok) {
            const pokemon = await result.json();
            createPokemonCard(pokemon);
        } else {
            error_shake();
            search_error.textContent = `No results found for ${id}...`;
        }
    } catch(e) {
        search_error.textContent = e;
    }

    return Promise.resolve();
}

// Shake the search bar when the search fails
function error_shake() {
    search_bar.setAttribute("class", "error_shake")
    setTimeout(function() {
        search_bar.setAttribute("class", "");
    }, 500);
}

// Waits for one second to see if the user stops typing,
// then searches for the Pokemon
const searchPokemon = async () => {
    clearTimeout(timeout);

    pokemon_container.innerHTML = "";
    search_error.textContent = "";

    timeout = setTimeout(function() {
        const search_value = search_bar.value.toLowerCase();
        if (search_value != "") {
            getPokemon(search_value)
        } else {
            getAllPokemon(10, 0);
        }
    }, 1000);
}

function createPokemonCard(pokemon) {
    const pokemon_card = document.createElement('div');
    pokemon_card.classList.add('pokemon_card');
    
    const types = pokemon.types.map(element => element.type.name);
    pokemon_card.style = `background:${type_colors[types[0]]}`;
    let type_innerHTML = `<span class="type">${types[0].toUpperCase()}</span>`;

    if (types.length > 1) {
        pokemon_card.style = `background: -webkit-linear-gradient(
            to right,
            ${type_colors[types[0]]},
            ${type_colors[types[1]]})`;
        pokemon_card.style = `background: linear-gradient(
            to right,
            ${type_colors[types[0]]},
            ${type_colors[types[1]]})`;
        type_innerHTML += `<span class="type">${types[1].toUpperCase()}</span>`;
    }

    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

    const pokemon_innerHTML = `
        <div class="info">
            <div class="basic_info">
                <span class="number">#${("000" + pokemon.id).slice (-3)}</span>
                <div class="sprite_and_name">
                    <div class="sprite_container">
                        <img class="sprite" src="${pokemon['sprites']['versions']['generation-vii']['icons']['front_default']}">
                    </div>
                    <h3 class="name">${name}</h3>
                </div>
            </div>
            <div class="types">
                ${type_innerHTML}
            </div>
        </div>

        <div class="img-container">
            <img src="${pokemon['sprites']['other']['official-artwork']['front_default']}">
        </div>
    `;

    pokemon_card.innerHTML = pokemon_innerHTML;

    pokemon_container.appendChild(pokemon_card)
}

// Start by showing the first 10 Pokemon
getAllPokemon(10, 0);