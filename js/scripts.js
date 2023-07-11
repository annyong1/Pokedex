let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');
        let listpokemon = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button-class');
        listpokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);
        //document.querySelector('button');
        button.addEventListener('click', function () {
            showDetails(pokemon);
        });
    }

    function loadList() {
        return fetch(apiUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                json.results.forEach(function (item) {
                    let pokemon = {
                        name: item.name,
                        detailsUrl: item.url,
                    };
                    add(pokemon);
                });
            })
            .catch(function (e) {
                console.error(e);
            });
    }

    // Open Pokemon Modal on click
    function showDetails(pokemon) {
        loadDetails(pokemon).then(() => {
            makePokemonModal(pokemon);
            showModal(pokemon);
        });
    }

    function showDetails(pokemon) {
        pokemonRepository.loadDetails(pokemon).then(function () {
            showModal(pokemon);
            console.log(pokemon);
        });
    }

    // Pull details about clicked Pokemon from API and add them to the clicked Pokemon object
    function loadDetails(pokemon) {
        let url = pokemon.detailsUrl;
        return fetch(url)
            .then((response) => response.json())
            .then((details) => {
                pokemon.imageUrl = details.sprites.front_default;
                pokemon.name = details.name;
                pokemon.height = details.height;
                pokemon.weight = details.weight;
                pokemon.types = details.types;
            })
            .catch((e) => {
                console.error(e);
            });
    }

    function makePokemonModal(pokemon) {
        console.log(pokemon);
        const modalContainer = document.querySelector('.pokedex-modal');

        const pokemonName = makePokemonName(pokemon);
        const pokemonImage = makePokemonImage(pokemon);
        const pokemonDetails = makePokemonDetails(pokemon);

        modalContainer.appendChild(pokemonName);
        modalContainer.appendChild(pokemonImage);
        modalContainer.appendChild(pokemonDetails);
    }

    function makePokemonName(pokemon) {
        const nameContainer = document.createElement('h3');
        nameContainer.innerHTML = pokemon.name;

        return nameContainer;
    }

    function makePokemonImage(pokemon) {
        const imageContainer = document.createElement('img');
        imageContainer.setAttribute('src', pokemon.imageUrl);

        return imageContainer;
    }

    function makePokemonDetails(pokemon) {
        const detailsContainer = document.createElement('div');
        const pokemonHeight = document.createElement('p');
        const pokemonWeight = document.createElement('p');

        pokemonHeight.innerHTML = pokemon.height;
        pokemonWeight.innerHTML = pokemon.weight;

        detailsContainer.appendChild(pokemonHeight);
        detailsContainer.appendChild(pokemonWeight);

        return detailsContainer;
    }

    function showModal(pokemon) {

        let pokemonName = document.querySelector('.modal-title');
        pokemonName.innerText = pokemon.name;

        let pokemonImage = document.querySelector('.pokemon-image');
        pokemonImage.src = pokemon.imageUrl;

        let pokemonHeight = document.querySelector('.pokemon-height');
        pokemonHeight.innerText = 'height : ' + (pokemon.height / 10) + ' m';


    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showModal: showModal
    };
})();

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});