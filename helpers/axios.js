const fs = require("fs");

const axios = require("axios");

class Pokemon {
	pokemonesArray = [];
	pokemonPromise = [];
	pokemonJSON = [];

	dbPath = "./db/database.json";

	constructor() {}

	get paramsPokeApi() {
		return {
			limit: 151,
			offset: 0,
		};
	}

	get pokemonCapitalizado() {
		return this.pokemonJSON.map((pokemon) => {
			console.log("pokemonCapitalizado", pokemon);
			let palabras = pokemon.split(" ");
			palabras = palabras.map((palabra) => palabra[0].toUpperCase() + palabra.substring(1));
			return palabras.join(" ");
		});
	}

	async pokemonesGet() {
		try {
			const instance = axios.create({
				baseURL: "https://pokeapi.co/api/v2/pokemon",
				params: this.paramsPokeApi,
			});
			const { data } = await instance.get();
			return data.results;
		} catch (error) {
			console.log("Error obteniendo los pokemones", error);
		}
	}

	async pokemonesGetImage(pokemonName) {
		const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
		return data;
	}

	pokemonAll() {
		this.pokemonesGet().then((results) => {
			results.forEach((pokemon) => {
				let pokemonName = pokemon.name;
				this.pokemonPromise.push(this.pokemonesGetImage(pokemonName));
			});

			Promise.all(this.pokemonPromise).then((data) => {
				data.forEach((pokemonData) => {
					this.pokemonJSON.push({
						name: pokemonData.name,
						image: pokemonData.sprites.front_default,
					});
					this.guardarDB();
				});
			});
		});
	}

	guardarDB() {
		const payload = {
			pokemones: this.pokemonJSON,
		};
		fs.writeFileSync(this.dbPath, JSON.stringify(payload));
	}
}

module.exports = Pokemon;
