let pokemonRepository = (function () {
  let e = [],
    t = "https://pokeapi.co/api/v2/pokemon/";
  function n(t) {
    "object" == typeof t && "name" in t && e.push(t);
  }
  function o(e) {
    let t = e.detailsUrl;
    return fetch(t)
      .then(function (e) {
        return e.json();
      })
      .then(function (t) {
        (e.imageUrl = t.sprites.front_default),
          (e.height = t.height),
          (e.types = t.types.map(function (e) {
            return e.type.name;
          }));
      })
      .catch(function (e) {
        console.error(e);
      });
  }
  function i(e) {
    o(e).then(function () {
      r(e);
    });
  }
  function r(e) {
    let t = document.querySelector(".modal-title");
    t.innerText = "";
    let n = document.querySelector(".modal-body");
    n.innerHTML = "";
    let o = document.createElement("img");
    o.setAttribute("src", e.imageUrl);
    let i = document.createElement("p");
    i.innerText = "Height: " + e.height;
    let r = document.createElement("p");
    (r.innerText = "Types: " + e.types),
      (t.innerText = e.name),
      n.appendChild(o),
      n.appendChild(i),
      n.appendChild(r);
  }
  function c() {
    document.querySelector("#modal-container").classList.remove;
  }
  window.addEventListener("keydown", (e) => {
    let t = document.querySelector("#modal-container");
    "Escape" === e.key && t.classList.contains("is-visible") && c();
  });
  let l = document.querySelector("#modal-container");
  return (
    l.addEventListener("click", (e) => {
      e.target === l && c();
    }),
    {
      add: n,
      getAll: function () {
        return e;
      },
      addListItem: function (e) {
        let t = document.querySelector(".pokemon-list"),
          n = document.createElement("li"),
          o = document.createElement("button");
        (o.innerText = e.name),
          o.classList.add("btn", "btn-secondary", "btn-block"),
          o.setAttribute("data-target", "#exampleModal"),
          o.setAttribute("data-toggle", "modal"),
          n.appendChild(o),
          t.appendChild(n),
          o.addEventListener("click", function () {
            i(e);
          });
      },
      loadList: function () {
        return fetch(t)
          .then(function (e) {
            return e.json();
          })
          .then(function (e) {
            e.results.forEach(function (e) {
              n({ name: e.name, detailsUrl: e.url });
            });
          })
          .catch(function (e) {
            console.error(e);
          });
      },
      loadDetails: o,
      showDetails: i,
      showModal: r,
    }
  );
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (e) {
    pokemonRepository.addListItem(e);
  });
});
