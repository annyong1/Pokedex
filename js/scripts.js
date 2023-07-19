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
        pokemonRepository.loadDetails(pokemon).then(function () {
            showModal(pokemon);
            console.log(pokemon);
        });

        let modalContainer = document.querySelector('.pokedex-modal-container-hide');


        let modal = document.createElement('div');
        modal.classList.add('modal');

        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'close';
        closeButtonElement.addEventListener('click', () => {
            hideModal();
        });

        //modalContainer.appendChild(closeButtonElement);

        //modalContainer.classList.add('is-visible');

        modalContainer.addEventListener('click', function (e) {
            let target = e.target;
            if (target === modalContainer) {
                hideModal();
            }
        });

        modalContainer.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
                hideModal();
            }
        })
        //modal.appendChild(closeButtonElement);
        //modal.appendChild(titleElement);
        //modal.appendChild(spriteElement);
        //modal.appendChild(contentElement);
        //modalContainer.appendChild(modal);

        //modalContainer.classList.add('is-visible');

    }

    window.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            hideModal();
        }
    })
    
    function hideModal() { //used to remove the modal displaying a pokemon's details
        let modalContainer = document.querySelector('.pokedex-modal-container');
        modalContainer.classList.add('pokedex-modal-container-hide');
    }

    // function showDetails(pokemon) {
    //     pokemonRepository.loadDetails(pokemon).then(function () {
    //         showModal(pokemon);
    //         console.log(pokemon);
    //     });
    // }

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

    // function makePokemonModal(pokemon) {
    //     console.log(pokemon);
    //     const modalContainer = document.querySelector('.pokedex-modal');

    //     const pokemonName = makePokemonName(pokemon);
    //     const pokemonImage = makePokemonImage(pokemon);
    //     const pokemonDetails = makePokemonDetails(pokemon);

    //     modalContainer.appendChild(pokemonName);
    //     modalContainer.appendChild(pokemonImage);
    //     modalContainer.appendChild(pokemonDetails);
    // }

    // function makePokemonName(pokemon) {
    //     const nameContainer = document.createElement('h3');
    //     nameContainer.innerHTML = pokemon.name;

    //     return nameContainer;
    // }

    // function makePokemonImage(pokemon) {
    //     const imageContainer = document.createElement('img');
    //     imageContainer.setAttribute('src', pokemon.imageUrl);

    //     return imageContainer;
    // }

    // function makePokemonDetails(pokemon) {
    //     const detailsContainer = document.createElement('div');
    //     const pokemonHeight = document.createElement('p');
    //     const pokemonWeight = document.createElement('p');

    //     pokemonHeight.innerHTML = pokemon.height;
    //     pokemonWeight.innerHTML = pokemon.weight;

    //     detailsContainer.appendChild(pokemonHeight);
    //     detailsContainer.appendChild(pokemonWeight);

    //     return detailsContainer;
    // }

    function showModal(pokemon) {

        let pokemonName = document.querySelector('.modal-title');
        pokemonName.innerText = pokemon.name;

        let pokemonImage = document.querySelector('.pokemon-image');
        pokemonImage.src = pokemon.imageUrl;

        let pokemonHeight = document.querySelector('.pokemon-height');
        pokemonHeight.innerText = 'height : ' + (pokemon.height / 10) + ' m';

        document
            .querySelector('.pokedex-modal-container-hide')
            .classList.replace('pokedex-modal-container-hide', 'pokedex-modal-container');
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showModal: showModal,
        hideModal: hideModal
    };
})();

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});