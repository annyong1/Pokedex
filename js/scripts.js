let pokemonRepository = (function () {

    let pokemonList = [
        {
            name: 'Machamp',
            type: ['fighting'],
            height: 1.6
        },
        {
            name: 'Magneton',
            type: ['electric', 'steel'],
            height: 1
        },
        {
            name: 'Muk',
            type: ['poison'],
            height: 1.2
        },
    ];

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    }

    return {
        add: add,
        getAll: getAll
    }
})();

function listPokemon(pokemon) {
    if (pokemon.height >= 1.6) {
        document.write('</p>');
        document.write(pokemon.name + " (height: " + pokemon.height + ")" + " - The BIGGEST!");
        document.write('</p>');

    } else if (pokemon.height < 1.6 && pokemon.height > 1) {
        document.write('</p>');
        document.write(pokemon.name + " (height: " + pokemon.height + ")" + " - The Averagest!");
        document.write('</p>');

    } else {
        document.write('</p>');
        document.write(pokemon.name + " (height: " + pokemon.height + ")" + " - The smallest!");
        document.write('</p>');

    }
    
}

pokemonRepository.getAll().forEach(listPokemon);

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
