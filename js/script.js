const pokemonName = document.querySelector('.pokemon-name')
const pokemonId = document.querySelector('.pokemon-number')
const pokemonImage = document.querySelector('.pokemon-image')
const input = document.querySelector('.input-search')
const form = document.querySelector('.form')
const btnNext = document.querySelector('.btn-next')
const btnPrev = document.querySelector('.btn-prev')
let searchPokemon = 1

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  if(APIResponse.status === 200){
    const data = await APIResponse.json()
    return data;
  }
}

const setNotFound = () => {
  pokemonImage.style.display = 'none';
  pokemonName.innerHTML = 'Not Found';
  pokemonId.innerHTML= '404';
  searchPokemon = 0;
}

const renderPokemon = async (pokemon) => {

  pokemonName.innerHTML = 'Loading...';
  pokemonId.innerHTML= '';
  const data = await fetchPokemon(pokemon)
  if(data){
    pokemonImage.style.display = 'block'
    pokemonName.innerHTML = data.name;
    pokemonId.innerHTML= data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    searchPokemon = data.id;
  } else {
    setNotFound();
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if(input.value > 649){
    setNotFound();
    return;
  }
  renderPokemon(input.value.toLowerCase());
})

btnPrev.addEventListener('click', () => {
  if(searchPokemon > 1 && searchPokemon < 650){
    searchPokemon-= 1;
    renderPokemon(searchPokemon);
  }
});

btnNext.addEventListener('click', () => {
  if(searchPokemon < 649){
    searchPokemon+= 1;
   renderPokemon(searchPokemon);
  }
});

renderPokemon('1')