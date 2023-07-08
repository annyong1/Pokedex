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

    function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function () {
          console.log(item);
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

const pokemonModal = (function () {
    function makeModalCloseButton() {
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('pokedex-modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        return closeButtonElement;
    }

    function makePokemonImg({ imageUrl }) {
        // let imgContainer = document.querySelector('.pokemon-img-container');
        // let pokemonImg = document.createElement('img');
        // pokemonImg.src = imageUrl;
        // pokemonImg.classList.add('pokemon-img');
        // imgContainer.appendChild(pokemonImg);
        // return imgContainer;
    }

    function makePokemonHeightAndWeight({ height, weight }) {
        // let physicalTraitContainer = document.querySelector('#about-screen');
        // let pysicalTraits = `Height: ${height}` + '<br>' + `Weight: ${weight}`;
        // physicalTraitContainer.innerHTML = pysicalTraits;
        // return physicalTraitContainer;
    }

    function makePokemonType({ types }) {
        // let typeContainer = document.querySelector('#type-screen');
        // let pokemonType = types[0].type.name;
        // typeContainer.innerHTML = pokemonType;
        // return typeContainer;
    }

    // Start of the Pokemon Modal
 
    function showModal(pokemon) {
        console.log(pokemon);
        // Make and edit all details in modal
        makePokemonImg(pokemon);
        makePokemonHeightAndWeight(pokemon);
        makePokemonType(pokemon);

        // Append modal and close button to container
        let modalContainer = document.querySelector('#pokedex-modal-container');
        let modal = document.querySelector('.pokedex-modal');
       modal.appendChild(makeModalCloseButton());
        modalContainer.appendChild(modal);

        // Display modal container and modal
        modalContainer.classList.add('is-visible');
        modal.style.display = 'inline-block';

        // Close modal when clicked outside of it
        modalContainer.addEventListener('click', (e) => {
            let target = e.target;
            if (target === modalContainer) {
                hideModal();
            }
        });

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
                pokemonModal.hideModal();
            }
        });
    }

    function hideModal() {
        let modalContainer = document.querySelector('#pokedex-modal-container');

        // Clear the previous modal content and close button
        if (document.querySelector('.pokedex-modal-close')) {
            document.querySelector('.pokedex-modal-close').remove();
        }

        if (document.querySelector('.pokemon-img')) {
            document.querySelector('.pokemon-img').remove();
        }

        if (document.querySelector('#about-screen').innerHTML !== '') {
            document.querySelector('#about-screen').innerHTML = '';
        }

        if (document.querySelector('#type-screen').innerHTML !== '') {
            document.querySelector('#type-screen').innerHTML = '';
        }

        modalContainer.classList.remove('is-visible');
    }

    return {
        showModal: showModal,
        hideModal: hideModal,
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
