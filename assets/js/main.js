const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

// Função para converter os dados do Pokémon em HTML
function convertPokemonToLi(pokemon) {
    return `
    <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>

        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>

            <img src="${pokemon.photo}"
                 alt="${pokemon.name}">
        </div>
    </li>
    `;
}

// Função para carregar os Pokémons com offset e limite
function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHTML = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHTML
    })
}

// Carrega os primeiros Pokémons na página
loadPokemonItens(offset, limit)

// Evento de clique no botão para carregar mais Pokémons
loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtsRecordsWithNextPage = offset + limit

    // Verifica se a próxima carga ultrapassaria o número máximo de registros
    if (qtsRecordsWithNextPage > maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        // Remove o botão "Carregar mais" após atingir o limite de registros
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})
