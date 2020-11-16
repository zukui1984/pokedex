/* Exercise 1.3
for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i]['height'] >= 2.5) {
        document.write('<p>' + pokemonList[i]['name'] + ' (height: ' + pokemonList[i]['height'] + ') - Wow that is big! </p >');
    } else {
        document.write('<p>' + pokemonList[i]['name'] + ' (height: ' + pokemonList[i]['height'] + ') <p>');
    }
}
*/

/* forReach loop ** //
let pokemonList = ['Pikachu', 'Clefairy', 'Psyduck'];

pokemonList.forEach(function (name) {
    console.log(name + ' is a pokemon monster');
});
*/

// IIFE
let pokemonRepository = (function () {
    let pokemonList = [
        { name: "Pikachu", height: 7, abilities: ["power"], types: ["thunder", "electric"] },
        { name: "Clefairy", height: 2, abilities: ["speed"], types: ["fairy", "fly"] },
        { name: "Psyduck", height: 2.07, abilities: ["strong"], types: ["water", "flood"] }
    ];

    function showDetails(pokemon) {
        console.log(pokemon);
    }

    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function addListItem(pokemon) {
        let pokemonList = document.querySelector(".pokemon-list");
        let listpokemon = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        listpokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);

        button.addEventListener('click', function () {
            showDetails(pokemon);
        });
    }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        showDetails: showDetails,
    };
})();

console.log(pokemonRepository.getAll());
pokemonRepository.add({ name: 'Pikachu', height: 7, types: ['electric', 'thunder'] });

pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});