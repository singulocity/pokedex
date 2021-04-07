const pokemon_container = document.getElementById('pokemon_container');
const search_bar = document.getElementById('search_bar');
const search_error = document.getElementById('search_error');
const generation_container = document.getElementById('generation_container');

let timeout = null;
//let next = '';
let locked_for_loading = false;
let generations = null;

//window.addEventListener('scroll', function() {
//    if (locked_for_loading == false && window.scrollY >= window.scrollMaxY * 0.9) {
//        getAllPokemon(next);
//    }
//});

const changeGeneration = async (url) => {
    search_bar.value = '';

    try {
        const result = await fetch(url);

        if (result.ok) {
            const generation = await result.json();

            const limit = generation.pokemon_species.length;
            const offset = generation.pokemon_species[0].url.slice(-4, -1) - 1;

            pokemon_container.innerHTML = '';
            search_error.textContent = '';

            getAllPokemon(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`);
        }
    } catch(e) {
        search_error.textContent = e;
    }
}

const getGenerations = async (url) => {
    try {
        const result = await fetch(url);

        if (result.ok) {
            generations = await result.json();

            for (let number = 0; number < generations.count; number++) {
                const generation_button = document.createElement('div');
                generation_button.classList.add('generation_button_container');

                generation_button.innerHTML = `
                    <button type="button" onclick="changeGeneration('${generations.results[number].url}')">${number + 1}</button>
                `;
                
                generation_container.appendChild(generation_button);
            }
        }
    } catch(e) {
        search_error.textContent = e;
    }
}

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

// Uses the pokeAPI to get a limited amount within an offset
const getAllPokemon = async (url) => {
    locked_for_loading = true;

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
        error_shake();
        search_error.textContent = e;
    }

    locked_for_loading = false;
}

// Uses the pokeAPI to get the Pokemon
const getPokemon = async (id) => {
    locked_for_loading = true;

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
        error_shake();
        search_error.textContent = e;
    }

    locked_for_loading = false;

    return Promise.resolve();
}

// Shake the search bar when the search fails
function error_shake() {
    search_bar.setAttribute('class', 'error_shake')
    setTimeout(function() {
        search_bar.setAttribute('class', '');
    }, 500);
}

// Waits for one second to see if the user stops typing,
// then searches for the Pokemon
const searchPokemon = async () => {
    clearTimeout(timeout);
    //next = '';
    pokemon_container.innerHTML = '';
    search_error.textContent = '';

    timeout = setTimeout(function() {
        const search_value = search_bar.value.toLowerCase();
        if (search_value != '') {
            getPokemon(search_value)
        } else {
            getAllPokemon(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`);
        }
    }, 1000);
}

function createPokemonCard(pokemon) {
    const pokemon_card = document.createElement('div');
    pokemon_card.classList.add('pokemon_card');
    
    const types = pokemon.types.map(element => element.type.name);
    pokemon_card.style = `background:${type_colors[types[0]]}`;
    let type_innerHTML = `<span class='type'>${types[0].toUpperCase()}</span>`;

    if (types.length > 1) {
        pokemon_card.style = `background: -webkit-linear-gradient(
            to right,
            ${type_colors[types[0]]},
            ${type_colors[types[1]]})`;
        pokemon_card.style = `background: linear-gradient(
            to right,
            ${type_colors[types[0]]},
            ${type_colors[types[1]]})`;
        type_innerHTML += `<span class='type'>${types[1].toUpperCase()}</span>`;
    }

    let female_index = pokemon.species.name.search('-f')
    let male_index = pokemon.species.name.search('-m')
    let name = '';
    
    // Very special case for the Nidoran family
    if (female_index != -1 || male_index != -1) {
        if (female_index != -1) {
            name = pokemon.species.name[0].toUpperCase() + pokemon.species.name.slice(1, -2) + '♀';
        } else {
            name = pokemon.species.name[0].toUpperCase() + pokemon.species.name.slice(1, -2) + '♂';
        }
    } else {
        name = pokemon.species.name[0].toUpperCase() + pokemon.species.name.slice(1);
    }

    const pokemon_innerHTML = `
        <div class='info'>
            <div class='basic_info'>
                <span class='number'>#${('000' + pokemon.id).slice (-3)}</span>
                <div class='sprite_and_name'>
                    <div class='sprite_container'>
                        <img class='sprite' src='${pokemon['sprites']['versions']['generation-viii']['icons']['front_default']}'>
                    </div>
                    <h3 class='name'>${name}</h3>
                </div>
            </div>
            <div class='types'>
                ${type_innerHTML}
            </div>
        </div>

        <div class='img-container'>
            <img src='${pokemon['sprites']['other']['official-artwork']['front_default']}'>
        </div>
    `;

    pokemon_card.innerHTML = pokemon_innerHTML;

    pokemon_container.appendChild(pokemon_card)
}

// Get the generations
getGenerations('https://pokeapi.co/api/v2/generation/');

// Get the first generation
getAllPokemon(`https://pokeapi.co/api/v2/pokemon/?limit=151&offset=0`);