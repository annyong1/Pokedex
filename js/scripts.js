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
        document.write('</p>');
        document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ")" + " - The BIGGEST!");
        document.write('</p>');

    } else if (pokemonList[i].height < 1.6 && pokemonList[i].height > 1) {
        document.write('</p>');
        document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ")" + " - The Averagest!");
        document.write('</p>');

    } else {
        document.write('</p>');
        document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ")" + " - The smallest!");
        document.write('</p>');

    }
}