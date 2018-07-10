jest.dontMock('../src/components/board');

import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import Board from '../src/components/board';

// mock window.prompt to always return default value
global.prompt = (arg, default_arg) => { return default_arg };

describe('Test Board Component', () => {

  let boardComponent;
  let boardNode;

  beforeEach(() => {
    boardComponent = ReactTestUtils.renderIntoDocument(
      <Board />
    );
    boardNode = ReactDOM.findDOMNode(boardComponent);
  });

  describe('Test rendering of elements', () => {
    it('test correct number of cells are rendered', () => {
      let cells = boardNode.querySelectorAll('.cell');
      expect(cells).toBeTruthy();
      expect(cells.length).toEqual(42);
    });
  });

  describe('Test game result functions', () => {
    it('test game is draw', () => {
      let board = [];
      for (let rowNumber = 0; rowNumber < 6; rowNumber++) {
        let row = [];
        for (let columnNumber = 0; columnNumber < 7; columnNumber++) { row.push('Player1'); }
        board.push(row);
      }
      expect(boardComponent.isGameDraw(board)).toEqual('draw');
    });
  
    it('test game is not draw', () => {
      let board = [];
      for (let rowNumber = 0; rowNumber < 6; rowNumber++) {
        let row = [];
        for (let columnNumber = 0; columnNumber < 7; columnNumber++) { row.push('Player1'); }
        board.push(row);
      }
      board[0][0] = null;
      expect(boardComponent.isGameDraw(board)).toEqual(false);
    });
  
    it('test row win', () => {
      let board = [];
      for (let rowNumber = 0; rowNumber < 6; rowNumber++) {
        let row = [];
        for (let columnNumber = 0; columnNumber < 7; columnNumber++) { row.push(null); }
        board.push(row);
      }
      for (let columnNumber = 1; columnNumber < 5; columnNumber++) {
        board[1][columnNumber] = 'Player1';
      }
      expect(boardComponent.verifyRow(board)).toEqual('Player1');
    });
  
    it('test column win', () => {
      let board = [];
      for (let rowNumber = 0; rowNumber < 6; rowNumber++) {
        let row = [];
        for (let columnNumber = 0; columnNumber < 7; columnNumber++) { row.push(null); }
        board.push(row);
      }
      for (let rowNumber = 1; rowNumber < 5; rowNumber++) {
        board[rowNumber][2] = 'Player2';
      }
      expect(boardComponent.verifyColumn(board)).toEqual('Player2');
    });

    it('test leftDiagonal win', () => {
      let board = [];
      for (let rowNumber = 0; rowNumber < 6; rowNumber++) {
        let row = [];
        for (let columnNumber = 0; columnNumber < 7; columnNumber++) { row.push(null); }
        board.push(row);
      }
      for (let index = 1; index < 5; index++) {
        board[index][index] = 'Player1';
      }
      expect(boardComponent.verifyLeftDiagonal(board)).toEqual('Player1');
    });

    it('test rightDiagonal win', () => {
      let board = [];
      for (let rowNumber = 0; rowNumber < 6; rowNumber++) {
        let row = [];
        for (let columnNumber = 0; columnNumber < 7; columnNumber++) { row.push(null); }
        board.push(row);
      }
      for (let index = 5; index > 1; index--) {
        board[index][(6 - index)] = 'Player2';
      }
      expect(boardComponent.verifyRightDiagonal(board)).toEqual('Player2');
    });
  });

  it('Test nextPlayer', () => {
    boardComponent.setState({ currentPlayer: 'Player1' });
    expect(boardComponent.nextPlayer()).toEqual('Player2');
    boardComponent.setState({ currentPlayer: 'Player2' });
    expect(boardComponent.nextPlayer()).toEqual('Player1');
  });

  it('Test addToken', () => {
    let expectedBoard = [];
    for (let rowNumber = 0; rowNumber < 6; rowNumber++) {
      let row = [];
      for (let columnNumber = 0; columnNumber < 7; columnNumber++) { row.push(null); }
      expectedBoard.push(row);
    }
    expectedBoard[5][2] = 'Player1';
    
    boardComponent.setState({ currentPlayer: 'Player1' });
    boardComponent.addToken(2);

    expect(boardComponent.state.board).toEqual(expectedBoard);
  });

});