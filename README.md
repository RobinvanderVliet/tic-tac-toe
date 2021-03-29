# Tic-tac-toe
A simple game of tic-tac-toe by [Robin van der Vliet](https://robinvandervliet.com/).

## Assignment
Create a browser-based tic-tac-toe graphical user interface (GUI) in React. Two people should be able to play a simple turn-based game of tic-tac-toe. The game has finished whenever O or X has won or if there is a draw. When the game has finished, it has to be saved in a database. There should also be an option to play against the computer with multiple levels of difficulty.

## Run the project
`docker-compose up`

* Client (game): http://localhost:3000/
* Server (API): http://localhost:3080/
* Mongo Express (debugging, testing): http://localhost:8081/

## Technologies used
* Docker
* React
* Node.js
* MongoDB

## Process
The first thing I did was setting up Docker. The project consists of four containers: one for the client (the React app), one for the server (a Node.js app that handles communication with the database), one for the MongoDB database (for storing played games), and one for Mongo Express (for debugging and testing purposes).

After setting up Docker, I started working on the client application.

For storing state variables I first tried using Hooks and the function `useState`. The game worked well when playing against a friend, but I ran against problems with implementing playing against the computer. Instead of Hooks, I switched to using `this.state` and `this.setState`.

Online I explored different algorithms for solving the game. There are two main difficulties for playing against the computer in my implementation: "beginner" and "impossible". The algorithm for the difficulty "beginner" is pretty simple: it checks if it can win with a single move, and then it does that move, otherwise it just picks a random move. The algorithm for the difficulty "impossible" is much more sophisticated. For this difficulty I implemented [the minimax algorithm](https://en.wikipedia.org/wiki/Minimax), which recursively finds the best moves possible for the computer. When it finds multiple moves of an equal score, it picks one at random. The other difficulties ("easy", "medium" and "hard") are derivatives of the two main algorithms: a random algorithm is chosen.

The server application is pretty straightforward. It contains one POST route that stores games in th MongoDB database.
