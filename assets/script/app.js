const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;
const fetchPokemon = () => {

    const pokemonPromises = [];
    
    for (let i = 1 ; i <= 150; i++){
        pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json()))
    }
    Promise.all(pokemonPromises)
    .then(pokemons => {
        
        const liPokemons = pokemons.reduce((accumulator, pokemon) => {
           const types = pokemon.types.map(typeInfo => typeInfo.type.name)
           
            accumulator += 
            `<li class="card">
            <img class="card-image ${types[0]}" alt ="${pokemon.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png"  />
            <h2 class="card-title" > ${pokemon.id}. ${pokemon.name}</h2>
            <p class="card-subtitle">${types.join(' | ')}</p>
            </li> `
            return accumulator
        },'')

        const ul = document.querySelector('.pokedex')

        ul.innerHTML = liPokemons
    })
}

fetchPokemon();

