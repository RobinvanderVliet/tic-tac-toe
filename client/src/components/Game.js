import React from "react";
import {calculateTie, calculateWin, findEasyMove, findPerfectMove} from "../helper";
import Board from "./Board";

/**
 * The game class.
 */
class Game extends React.Component {
	/**
	 * Initialize the game object.
	 * @param props The props.
	 */
	constructor(props) {
		super(props);

		this.state = {
			board: Array(9).fill(null),
			history: [],
			turn: "X",
			difficulty: 0
		};
	}

	/**
	 * Handle a click on one of the squares of the game board.
	 * @param square The selected square, a number between 0 and 9.
	 */
	handleClick(square) {
		let board = this.state.board;
		let history = this.state.history;
		let turn = this.state.turn;

		if (calculateWin(board) || board[square]) {
			//Ignore the click if there is already a winner or if this game board square is already filled.
			return;
		}

		board[square] = turn;
		history.push(square);

		//Execute computer move, if there is no winner and if it is a game against the computer.
		if (!calculateWin(board) && this.state.difficulty > 0) {
			let move;

			//Choose a move based on the selected difficulty.
			switch (this.state.difficulty) {
				case 1:
					move = findEasyMove(board);
					break;
				case 2:
					move = Math.random() < 0.8 ? findEasyMove(board) : findPerfectMove(board);
					break;
				case 3:
					move = Math.random() < 0.5 ? findEasyMove(board) : findPerfectMove(board);
					break;
				case 4:
					move = Math.random() < 0.2 ? findEasyMove(board) : findPerfectMove(board);
					break;
				case 5:
					move = findPerfectMove(board);
					break;
			}

			board[move] = "O";
			history.push(move);
		} else {
			turn = turn === "X" ? "O" : "X";
		}

		this.setState({
			board: board,
			history: history,
			turn: turn
		});
	}

	/**
	 * Restart the game by resetting all state variables.
	 */
	restart() {
		this.setState({
			board: Array(9).fill(null),
			history: [],
			turn: "X"
		});
	}

	/**
	 * Change the difficulty of the game. This will always restart the game.
	 * @param event The event.
	 */
	changeDifficulty(event) {
		this.restart();

		this.setState({
			difficulty: event.target.value * 1
		});
	}

	/**
	 * Send the game state to the server, which will store it in a database.
	 * If it fails for some reason, the client should not notice anything.
	 */
	sendStatus() {
		fetch("http://localhost:3080/api/game", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				//This is the only data the server would really need. The game can be replayed with just this data.
				difficulty: this.state.difficulty,
				history: this.state.history
			})
		});
	}

	/**
	 * Render the game.
	 * @returns {JSX.Element} The element containing the game.
	 */
	render() {
		const board = this.state.board;
		const winner = calculateWin(board);
		const tie = calculateTie(board);

		let status;

		if (winner) {
			status = winner + " won the game!";
			this.sendStatus();
		} else if (tie) {
			status = "It is a tie!";
			this.sendStatus();
		} else {
			status = "Next player: " + this.state.turn;
		}

		return (
			<>
				<h1>Tic-tac-toe</h1>

				<select onChange={event => this.changeDifficulty(event)}>
					<option value={0}>Against a friend</option>
					<option value={1}>Beginner</option>
					<option value={2}>Easy</option>
					<option value={3}>Medium</option>
					<option value={4}>Hard</option>
					<option value={5}>Impossible</option>
				</select>

				<button onClick={() => this.restart()}>Restart</button>

				<Board board={board} onClick={i => this.handleClick(i)}/>

				<div id={"status"}>{status}</div>
			</>
		);
	}
}

export default Game;
