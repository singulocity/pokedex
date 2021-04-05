const pokemon_container = document.getElementById('pokemon_container');
const max_pokemon = 9;

const type_colors = {
    normal:'#a8a878bb',
    fire:'#f08030bb',
    water:'#6890f0bb',
    grass:'#78c850bb',
    electric:'#f8d030bb',
    ice:'#98d8d8bb',
    fighting:'#c03028bb',
    poison:'#a040a0bb',
    ground:'#e0c068bb',
    flying:'#a890f0bb',
    psychic:'#f85888bb',
    bug:'#a8b820bb',
    rock:'#b8a038bb',
    ghost:'#705898bb',
    dark:'#705848bb',
    dragon:'#7038f8bb',
    steel:'#b8b8d0bb',
    fairy:'#f0b6bcbb'
}

// Strip the type_colors of its keys so that they can be easily compared
const type_names = Object.keys(type_colors);

const getAllPokemon = async () => {
    for (let id = 1; id <= max_pokemon; id++) {
        await getPokemon(id);
    }
}

const getPokemon = async id => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const result = await fetch(url);
    const pokemon = await result.json();
    createPokemonCard(pokemon);
}

getAllPokemon();

function createPokemonCard(pokemon) {
    const pokemon_card = document.createElement('div');
    pokemon_card.classList.add('pokemon');
    
    const types = pokemon.types.map(element => element.type.name);
    pokemon_card.style = `background:${type_colors[types[0]]}`;
    let type_innerHTML = `<span class="type">${types[0].toUpperCase()}</span>`;

    if (types.length > 1) {
        pokemon_card.style = `background: -webkit-linear-gradient(to right, ${type_colors[types[0]]}, ${type_colors[types[1]]})`;
        pokemon_card.style = `background: linear-gradient(to right, ${type_colors[types[0]]}, ${type_colors[types[1]]})`;
        type_innerHTML += `<span class="type">${types[1].toUpperCase()}</span>`;
    }

    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

    const pokemon_innerHTML = `
        <div class="info">
            <div class="name_and_number">
                <span class="number">#${("000" + pokemon.id).slice (-3)}</span>
                <h3 class="name">${name}</h3>
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