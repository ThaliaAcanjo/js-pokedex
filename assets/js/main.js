const pokemonList = document.getElementById('pokemonList')
// Paginação Load More
const loadMoreButton = document.getElementById('loadMoreButton')
const paginationLoadMore = document.getElementById('paginationLoadMore')
const backToTop = document.getElementById('backToTop');

const maxRecords = 151
const limit = 10
let offset = 0;

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
    </li>`
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
    var heightPage = document.body.scrollHeight;
    window.scrollTo(0, heightPage);
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

backToTop.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
});

window.addEventListener('scroll', function () {    
    if (window.scrollY >= 100) {
        backToTop.style.visibility = "visible"; 
        backToTop.style.opacity = 1;
        backToTop.style.transform = "translateY(0)";
    } else {
        backToTop.style.visibility = "hidden"; 
        backToTop.style.opacity = 0;
        backToTop.style.transform = "translateY(100%)"; 
    }
})
