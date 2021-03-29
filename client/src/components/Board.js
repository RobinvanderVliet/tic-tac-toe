import React from "react";

/**
 * The game board class.
 */
class Board extends React.Component {
	/**
	 * Render the game board.
	 * @returns {JSX.Element} The element containing the game board.
	 */
	render() {
		return (
			<table>
				<tbody>
				<tr>
					<td className={this.props.board[0]} onClick={() => this.props.onClick(0)}/>
					<td className={this.props.board[1]} onClick={() => this.props.onClick(1)}/>
					<td className={this.props.board[2]} onClick={() => this.props.onClick(2)}/>
				</tr>
				<tr>
					<td className={this.props.board[3]} onClick={() => this.props.onClick(3)}/>
					<td className={this.props.board[4]} onClick={() => this.props.onClick(4)}/>
					<td className={this.props.board[5]} onClick={() => this.props.onClick(5)}/>
				</tr>
				<tr>
					<td className={this.props.board[6]} onClick={() => this.props.onClick(6)}/>
					<td className={this.props.board[7]} onClick={() => this.props.onClick(7)}/>
					<td className={this.props.board[8]} onClick={() => this.props.onClick(8)}/>
				</tr>
				</tbody>
			</table>
		);
	}
}

export default Board;
