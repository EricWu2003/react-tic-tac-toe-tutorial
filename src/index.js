import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


// class Square extends React.Component {
// 	// constructor(props){
// 	// 	super(props)
// 	// 	this.state = {
// 	// 		value: null,
// 	// 	}
// 	// }


// 	render() {
// 		return (
// 			<button className="square" 
// 				onClick={()=>this.props.onClick()}>
// 				{this.props.value}
// 			</button>
// 		);
// 	}
// }

function Square(props) {
	return (
		<button className="square"
			onClick={props.onClick}>
			{props.value}
		</button>
	)
}

class Board extends React.Component {
	// constructor(props) {
	// 	super(props)
	// 	this.state = {
	// 		squares: Array(9).fill(null),
	// 		xIsNext: true
	// 	}
	// }

	

	renderSquare(i) {
		return <Square value={this.props.squares[i]} onClick={() => this.props.handleClick(i)} />;
	}

	render() {

		let status
		const winner = calculateWinner(this.props.squares)
		if(winner){
			status = 'Winner: ' + winner
		} else {
			status = 'Next player: ' + (this.props.xIsNext ? "X" : "O")
		}

		return (
			<div>
				<div className="status">{status}</div>
				<div className="board-row">
					{this.renderSquare(0)}
					{this.renderSquare(1)}
					{this.renderSquare(2)}
				</div>
				<div className="board-row">
					{this.renderSquare(3)}
					{this.renderSquare(4)}
					{this.renderSquare(5)}
				</div>
				<div className="board-row">
					{this.renderSquare(6)}
					{this.renderSquare(7)}
					{this.renderSquare(8)}
				</div>
			</div>
		);
	}
}

class Game extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			history:[Array(9).fill(null)],
			xIsNext:true
		}
		//console.log("history:")
		//console.log(this.state.history[this.state.history.length - 1])
	}


	handleClickForGame(i) {
		//console.log("handled click!!!")
		//console.log(this.state.history)
		let squares = this.state.history[this.state.history.length - 1].slice()
		if(calculateWinner(squares) || squares[i]) //if there is already a winner, or if the current square is already filled
			return

		squares[i] = this.state.xIsNext ? "X" : "O"
		this.state.history[this.state.history.length] = squares
		this.setState({xIsNext: !this.state.xIsNext })
	}

	
	render() {
		return (
			<div className="game">
				<div className="game-board">
					<Board squares={this.state.history[this.state.history.length - 1]} 
					xIsNext={this.state.xIsNext} handleClick={i => this.handleClickForGame(i)} />
					{/* note, in the line above, for handleClick, the following do not work:
					handleClick= this.handleClickForGame
					handleClick = function(i){this.handleClickForGame(i)} */}
				</div>
				<div className="game-info">
					<div>{/* status */}</div>	
					<ol>{/* TODO */}</ol>
				</div>
			</div>
		);
	}
}

function calculateWinner(squares) {
	//function to find the winner of a specific squares arangement
	let lines = [
		[0, 1, 2], [3, 4, 5], [6, 7, 8],//horizontal lines
		[0, 3, 6], [1, 4, 7], [2, 5, 8],//vertical lines
		[0, 4, 8], [2, 4, 6]					//diagonals
	]

	for (let line of lines) {
		if (squares[line[0]] && squares[line[0]] == squares[line[1]] && squares[line[0]] == squares[line[2]]) {
			return squares[line[0]]
		}
	}
	return null

}


// ========================================

ReactDOM.render(
	<Game />,
	document.getElementById('root')
);
