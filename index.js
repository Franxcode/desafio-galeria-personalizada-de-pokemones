const Server = require("./models/server");

const Pokemon = require("./helpers/axios");

const main = async () => {
	const server = new Server();
	const pokemon = new Pokemon();

	server.listen();

	pokemon.pokemonAll();
};

main();
