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
            (pokemon);
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

    function makePokemonModal(pokemon) {
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
        const imageContainer = document.createElement('h3');
        imageContainer.innerHTML = pokemon.image;

        return imageContainer;
    }

    function makePokemonDetails(pokemon){
        const detailsContainer = document.createElement('h3');
        detailsContainer.innerHTML = pokemon.details;

        return detailsContainer;
    }


    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
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