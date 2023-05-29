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

for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height >= 1.6) {
        document.write
        
        (pokemonList[i].name + pokemonList[i].height + " - The BIGGEST!");

    } else if (pokemonList[i].height < 1.6 && pokemonList[i].height > 1) {
        document.write
        
        (pokemonList[i].name + pokemonList[i].height + " - The Averagest!");

    } else {
        document.write
        
        (pokemonList[i].name + pokemonList[i].height + "- The smallest!");

    }
}