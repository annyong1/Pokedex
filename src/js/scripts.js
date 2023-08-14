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
		button.classList.add("btn", "btn-outline-secondary", "btn-block");
		button.setAttribute("data-target", "#modal-container"); // Set data-target attribute
		button.setAttribute("data-toggle", "modal");
		listpokemon.appendChild(button);
		pokemonList.appendChild(listpokemon);
		button.addEventListener('click', function () {
			showDetails(pokemon);
		});
	}

	function loadList() {
		return fetch(apiUrl)
			.then(function (response) {
				return response.json();
			})
			.then(function (json) {
				json.results.forEach(function (item) {
					let pokemon = {
						name: item.name,
						detailsUrl: item.url,
					};
					add(pokemon);
				});
			})
			.catch(function (e) {
				console.error(e);
			});
	}

	function loadDetails(pokemon) {
		let url = pokemon.detailsUrl;
		return fetch(url)
			.then((response) => response.json())
			.then((details) => {
				pokemon.imageUrl = details.sprites.front_default;
				pokemon.name = details.name;
				pokemon.height = details.height;
				pokemon.weight = details.weight;
				pokemon.types = details.types;
			})
			.catch((e) => {
				console.error(e);
			});
	}

	function showDetails(item) {
		pokemonRepository.loadDetails(item).then(function () {
			const modalContainer = document.getElementById("modal-container");
			const modalTitle = document.getElementById("modal-title");
			const modalHeight = document.getElementById("modal-height");
			const modalImage = document.getElementById("modal-image");
			const modalClose = document.getElementById("modal-close");

			modalTitle.textContent = "name: " + item.name;
			modalHeight.textContent = "height: " + (item.height * 0.328084).toFixed(2) + " ft";
			modalHeight.style.marginTop = "10px";
			modalHeight.insertAdjacentHTML("beforeend", "<br>weight: " + (item.weight * 0.220462).toFixed(2) + " lbs");

			modalImage.setAttribute("src", item.imageUrl);
			modalImage.setAttribute("alt", item.name);

			modalClose.addEventListener("click", function () {
				modalContainer.style.display = "none";
			});

			modalContainer.style.display = "block";
		});
	}

	return {
		add: add,
		getAll: getAll,
		addListItem: addListItem,
		loadList: loadList,
		loadDetails: loadDetails,
		showDetails: showDetails,
	};
})();

pokemonRepository.loadList().then(function () {
	pokemonRepository.getAll().forEach(function (pokemon) {
		pokemonRepository.addListItem(pokemon);
	});
});