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
        loadDetails(pokemon).then(() => {
            pokemonModal.showModal(pokemon);
        });
    }

    // Pull details about clicked Pokemon from API and add them to the clicked Pokemon object
    function loadDetails(pokemon) {
        showLoadingMessage();
        let url = pokemon.detailsUrl;
        return fetch(url)
            .then((response) => response.json())
            .then((details) => {
                pokemon.imageUrl = details.sprites.front_default;
                pokemon.height = details.height;
                pokemon.weight = details.weight;
                pokemon.types = details.types;
                hideLoadingMessage();
            })
            .catch((e) => {
                hideLoadingMessage();
                console.error(e);
            });
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
