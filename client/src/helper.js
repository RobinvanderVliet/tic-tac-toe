/**
 * Check if there is a winner on the game board.
 * @param board The game board.
 * @returns {string|null} The winner or a null, if there is no winner.
 */
export function calculateWin(board) {
	//First make a list of all possible winning combinations.
	const wins = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];

	//Loop through all winning combinations.
	for (let i = 0; i < wins.length; i++) {
		const [a, b, c] = wins[i];

		//Skip this combination, if the first value is not filled in.
		if (board[a] === null) {
			continue;
		}

		//Return the winner, if the first, second and third value are equal.
		if (board[a] === board[b] && board[a] === board[c]) {
			return board[a];
		}
	}

	//No win found.
	return null;
}

/**
 * Check whether the game board reached a tie.
 * @param board The game board.
 * @returns {boolean} Whether it is a tie.
 */
export function calculateTie(board) {
	//If there is no null in the board anymore, then it is a tie.
	return !board.includes(null);
}

/**
 * Use the algorithm minimax to calculate a score for the given game board.
 * @link https://en.wikipedia.org/wiki/Minimax The English Wikipedia article on the algorithm minimax
 * @param board The game board.
 * @param depth The depth of the recursion.
 * @param isMaximizing Whether this recursion should try to win or to lose.
 * @returns {number} The recursively calculated score given to this game board.
 */
function minimax(board, depth, isMaximizing) {
	let winner = calculateWin(board);

	if (winner === "O") {
		return 10 - depth;
	} else if (winner === "X") {
		return depth - 10;
	} else if (calculateTie(board)) {
		return 0;
	}

	//The board is not in a terminal state: there is no winner and no tie.

	let bestValue = isMaximizing ? -50 : 50;

	//Check which non-empty cells produce good moves.
	for (let i = 0; i < 9; i++) {
		if (board[i] !== null) {
			continue;
		}

		//Try a move.
		board[i] = isMaximizing ? "O" : "X";

		let calculated = minimax(board, depth + 1, !isMaximizing);
		bestValue = isMaximizing ? Math.max(bestValue, calculated) : Math.min(bestValue, calculated);

		//Undo the move.
		board[i] = null;
	}

	return bestValue;
}

/**
 * Find the perfect next move on the board.
 * @param board The game board.
 * @returns {number|null} The calculated move or null if there is no move possible.
 */
export function findPerfectMove(board) {
	let bestValue = -50;
	let bestMoves = [null];

	//Check which non-empty cells produce good moves.
	for (let i = 0; i < 9; i++) {
		if (board[i] !== null) {
			continue;
		}

		//Try a move.
		board[i] = "O";

		//Calculate the score of this move and all possible next moves.
		let moveValue = minimax(board, 0, false);

		//Undo the move
		board[i] = null;

		//Store the move, if it is better or equal to a move found before.
		if (moveValue > bestValue) {
			bestMoves = [i];
			bestValue = moveValue;
		} else if (moveValue === bestValue) {
			bestMoves.push(i);
		}
	}

	return bestMoves[Math.floor(Math.random() * bestMoves.length)];
}

/**
 * Check if there is a winning move, then it returns that move. If there is no winning move, then it just chooses a random move.
 * @param board The game board.
 * @returns {number|null} The calculated move or null if there is no move possible.
 */
export function findEasyMove(board) {
	let bestMoves = [];
	let possibleMoves = [];

	//Check which non-empty cells produce good moves.
	for (let i = 0; i < 9; i++) {
		if (board[i] !== null) {
			continue;
		}

		possibleMoves.push(i);

		//Try a move.
		board[i] = "O";

		//Check if this move causes a win.
		if (calculateWin(board) === "O") {
			bestMoves.push(i);
		}

		//Undo the move.
		board[i] = null;
	}

	if (bestMoves.length > 0) {
		return bestMoves[Math.floor(Math.random() * bestMoves.length)];
	} else if (possibleMoves.length > 0) {
		return possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
	}

	//No move found, it is a tie.
	return null;
}
