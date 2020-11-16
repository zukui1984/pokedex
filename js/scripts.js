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
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/";

   function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener("click", function (event) {
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
            detailsUrl: item.url,
          };
          add(pokemon);
          console.log(pokemon);
        });
      }).catch(function (e) {console.error(e);
      });
  }

  function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }

  function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function(response){
          return response.json();
      }).then(function(details){
        item.imgUrl = details.front_default;
        item.height = details.height;
      });

function showDetails(item) {
    pokemonRepistory.loadDetails(item).then(function() {
        console.log(item);
});
}

  return {
    add: add,
    addListItem: addListItem,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

console.log(pokemonRepository.getAll());
pokemonRepository.add({
  name: "Pikachu",
  height: 7,
  types: ["electric", "thunder"],
});

pokemonRepository.loadList().then(function(){
pokemonRepository.getAll().forEach(function (pokemon) {
pokemonRepository.addListItem(pokemon);
});
