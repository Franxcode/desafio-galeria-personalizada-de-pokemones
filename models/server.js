const fs = require("fs");
const express = require("express");
const path = require("path");

class Server {
	constructor() {
		this.app = express();
		this.port = 3000;

		this.middlewares();
	}

	middlewares() {
		this.app.use(express.static("public"));

		this.app.get("/pokemones", (req, res) => {
			fs.readFile("./db/database.json", { encoding: "utf-8" }, (err, json) => {
				res.writeHead(200, { "Content-Type": "application/json" });
				res.end(json);
			});
		});

		this.app.get("*", (req, res) => {
			res.sendFile(path.join(__dirname, "../public", "404.html"));
		});
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log(`Server up and listening at http://localhost:${this.port}`);
		});
	}
}

module.exports = Server;
