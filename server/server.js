const express = require("express");
const cors = require("cors");
const mongo = require("mongodb").MongoClient;
const app = express();

app.use(express.json());
app.use(cors());

//Create a POST route that can store a game in the database.
app.post("/api/game", (request, resource) => {
	mongo.connect("mongodb://mongo/", function(error, database) {
		if (error) {
			throw error;
		}

		//Do some basic checks on the request body.

		if (!("difficulty" in request.body && "history" in request.body)) {
			return;
		}

		if (!(Number.isInteger(request.body["difficulty"]) && Array.isArray(request.body["history"]) && request.body["history"].length < 10)) {
			return;
		}

		//If everything looks good, try inserting it.
		database.db("tictactoe").collection("games").insertOne({ "difficulty": request.body["difficulty"], "history": request.body["history"] }, function (error, resource) {
			if (error) {
				throw error;
			}

			console.log("Game inserted");
		});

		//Close the database connection.
		database.close();
	});

	//There is nothing really to return.
	resource.json([]);
});

//Start the server.
app.listen(3080, () => {
	console.log("The server is listening for requests...");
});
