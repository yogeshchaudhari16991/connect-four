jest.dontMock('../src/components/cell');

import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import Cell from '../src/components/cell';

describe('Test Cell Component', () => {

  describe('Test color of cell', () => {
    it('Test default cell color', () => {
      let cellComponent = ReactTestUtils.renderIntoDocument(
        <Cell player1='Player1' player2='Player2' value='' columnIndex={1} addToken={() => {return true;}} />
      );
      let cellNode = ReactDOM.findDOMNode(cellComponent);
      let coloredCell = cellNode.querySelectorAll('.white');
      expect(coloredCell.length).toEqual(1);
    });

    it('Test player1\'s cell color', () => {
      let cellComponent = ReactTestUtils.renderIntoDocument(
        <Cell player1='Player1' player2='Player2' value='Player1' columnIndex={1} addToken={() => {return true;}} />
      );
      let cellNode = ReactDOM.findDOMNode(cellComponent);
      let coloredCell = cellNode.querySelectorAll('.black');
      expect(coloredCell.length).toEqual(1);
    });

    it('Test player2\'s cell color', () => {
      let cellComponent = ReactTestUtils.renderIntoDocument(
        <Cell player1='Player1' player2='Player2' value='Player2' columnIndex={1} addToken={() => {return true;}} />
      );
      let cellNode = ReactDOM.findDOMNode(cellComponent);
      let coloredCell = cellNode.querySelectorAll('.red');
      expect(coloredCell.length).toEqual(1);
    });
  });
});