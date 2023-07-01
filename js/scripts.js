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
        button.addEventListener('click', function (event) {
            showDetails(pokemon);
        });
    }

    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    // return {
    //     add: add,
    //     getAll: getAll,
    //     loadList: loadList
    // };
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    function showDetails(pokemon) {
        loadDetails(pokemon)
    }

    //let modalContainer = document.querySelector('#modal-container');

    function showModal(pokemon) {

        let modalTitle = document.querySelector(".modal-title");
        modalTitle.innerText = pokemon.name;

        let pokemonHeight = document.querySelector('.pokemon-height');
        pokemonHeight.innerText = 'Height : ' + (pokemon.height);
    }

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = title;

    let contentElement = document.createElement('p');
    contentElement.innerText = text;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');


    function hideModal() {
        modalContainer.classList.remove('is-visible');
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    modalContainer.addEventListener('click', (e) => {
        // Since this is also triggered when clicking INSIDE the modal
        // We only want to close if the user clicks directly on the overlay
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });

    document.querySelector('#show-modal').addEventListener('click', () => {
        showModal('Modal title', 'This is the modal content!');
    });
}

return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
    };
})();

// function listPokemon(pokemon) {
//     if (pokemon.height >= 1.6) {
//         document.write('<p>');
//         document.write(pokemon.name + " (height: " + pokemon.height + ")" + " - The BIGGEST!");
//         document.write('</p>');

//     } else if (pokemon.height < 1.6 && pokemon.height > 1) {
//         document.write('<p>');
//         document.write(pokemon.name + " (height: " + pokemon.height + ")" + " - The Averagest!");
//         document.write('</p>');

//     } else {
//         document.write('<p>');
//         document.write(pokemon.name + " (height: " + pokemon.height + ")" + " - The smallest!");
//         document.write('</p>');

//     }

// }

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});


// for (let i = 0; i < pokemonList.length; i++) {
    // if (pokemonList[i].height >= 1.6) {
    //     document.write('</p>');
    //     document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ")" + " - The BIGGEST!");
    //     document.write('</p>');

    // } else if (pokemonList[i].height < 1.6 && pokemonList[i].height > 1) {
    //     document.write('</p>');
    //     document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ")" + " - The Averagest!");
    //     document.write('</p>');

    // } else {
    //     document.write('</p>');
    //     document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ")" + " - The smallest!");
    //     document.write('</p>');

//     }
