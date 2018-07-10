import React from 'react';
import Row from './row';

class Board extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      currentPlayer: '',
      board: [],
      gameOver: false,
      player1: 'Player1',
      player2: 'Player2',
      message: null
    };
    
    this.addToken = this.addToken.bind(this);
  }

  addToken(columnIndex) {
    let board = this.state.board;
    if (! this.state.gameOver) {
      for (let rowNumber = 5; rowNumber >= 0; rowNumber--) {
        if (!board[rowNumber][columnIndex]) {
            board[rowNumber][columnIndex] = this.state.currentPlayer;
            break;
        }
      }

      let result = this.checkForWinner(board);

      if (! result) {
        this.setState({ board: board, currentPlayer: this.nextPlayer() });
      } else {
        if (result === 'draw') {
          this.setState({ board: board, gameOver: true, message: 'Draw game.' });
        } else {
          this.setState({ board: board, gameOver: true, message: `${ this.state.currentPlayer } wins!` });
        }
      }

    } else {
      if ( window.confirm( 'Start a new game?' ) ) {
          this.resetBoard();
      } else {
          this.setState({ board: board, gameOver: true, message: null });
      }
    }
  }
      
  checkForWinner(board) {
    let result = this.verifyRow(board);
    if (! result) { 
      result = this.verifyColumn(board);
    }
    if (! result) {
      result = this.verifyDiagonal(board);
    }
    if (! result) {
      result = this.isGameDraw(board);
    }
    return result;
  }

  nextPlayer() {
    return ( this.state.currentPlayer === this.state.player1 ) ? this.state.player2 : this.state.player1;
  }

  resetBoard() {
    const player1 = prompt( 'Player1\'s name: ', 'Player1' );
    const player2 = prompt( 'Player2\'s name: ', 'Player2' );
    // if user clicks 'cancel' on prompt, player1 and player2 gets null value assigned
    // and hence, board will be filled with all black circles
    // click on 'New Game' to start new game
    let board = [];
    for (let rowNumber = 0; rowNumber < 6; rowNumber++) {
      let row = [];
      for (let columnNumber = 0; columnNumber < 7; columnNumber++) { row.push(null) }
      board.push(row);
    }
    
    this.setState({
      board: board,
      player1: player1,
      player2: player2,
      currentPlayer: player1,
      gameOver: false,
      message: null
    });
  }

  verifyDiagonal(board) {
    return this.verifyRightDiagonal(board) || this.verifyLeftDiagonal(board);
  }
  
  verifyColumn(board) {
    for (let rowNumber = 3; rowNumber < 6; rowNumber++) {
      for (let columnNumber = 0; columnNumber < 7; columnNumber++) {
        if (board[rowNumber][columnNumber]) {
          if (board[rowNumber][columnNumber] === board[rowNumber - 1][columnNumber] &&
              board[rowNumber][columnNumber] === board[rowNumber - 2][columnNumber] &&
              board[rowNumber][columnNumber] === board[rowNumber - 3][columnNumber]) {
            return board[rowNumber][columnNumber];    
          }
        }
      }
    }
    return false;
  }
  
  verifyRow(board) {
    for (let rowNumber = 0; rowNumber < 6; rowNumber++) {
      for (let columnNumber = 0; columnNumber < 4; columnNumber++) {
        if (board[rowNumber][columnNumber]) {
          if (board[rowNumber][columnNumber] === board[rowNumber][columnNumber + 1] && 
              board[rowNumber][columnNumber] === board[rowNumber][columnNumber + 2] &&
              board[rowNumber][columnNumber] === board[rowNumber][columnNumber + 3]) {
            return board[rowNumber][columnNumber];
          }
        }
      }
    }
    return false;
  }
  
  verifyRightDiagonal(board) {
    for (let rowNumber = 3; rowNumber < 6; rowNumber++) {
      for (let columnNumber = 0; columnNumber < 4; columnNumber++) {
        if (board[rowNumber][columnNumber]) {
          if (board[rowNumber][columnNumber] === board[rowNumber - 1][columnNumber + 1] &&
              board[rowNumber][columnNumber] === board[rowNumber - 2][columnNumber + 2] &&
              board[rowNumber][columnNumber] === board[rowNumber - 3][columnNumber + 3]) {
            return board[rowNumber][columnNumber];
          }
        }
      }
    }
    return false;
  }
  
  verifyLeftDiagonal(board) {
    for (let rowNumber = 3; rowNumber < 6; rowNumber++) {
      for (let columnNumber = 3; columnNumber < 7; columnNumber++) {
        if (board[rowNumber][columnNumber]) {
          if (board[rowNumber][columnNumber] === board[rowNumber - 1][columnNumber - 1] &&
              board[rowNumber][columnNumber] === board[rowNumber - 2][columnNumber - 2] &&
              board[rowNumber][columnNumber] === board[rowNumber - 3][columnNumber - 3]) {
            return board[rowNumber][columnNumber];
          }
        }
      }
    }
    return false;
  }
  
  isGameDraw(board) {
    for (let rowNumber = 0; rowNumber < 6; rowNumber++) {
      for (let columnNumber = 0; columnNumber < 7; columnNumber++) {
        if (board[rowNumber][columnNumber] === null) {
          return false;
        }
      }
    }
    return 'draw';    
  }
  
  componentWillMount() {
    this.resetBoard();
  }
  
  componentDidUpdate() {
    if (this.state.gameOver && this.state.message) {
        const message = this.state.message;
        // wait for animation to complete
        setTimeout(function() { alert(message) }, 500, message);
    }
  }

  render() {
    return (
      <div>
        <div className='button' onClick={() => { this.resetBoard() }}>New Game</div>
        <table>
          <thead>
          </thead>
          <tbody>
            {this.state.board.map((row, index) => (<Row key={index} row={row} addToken={this.addToken} player1={this.state.player1} player2={this.state.player2} />))}
          </tbody>
        </table>
      </div>
    );
  }
}


export default Board;