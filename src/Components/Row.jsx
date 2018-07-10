import React from 'react';
import Cell from './Cell';
import PropTypes from 'prop-types';

class Row extends React.Component {
  render() {
      const Row = this.props.row.map(
        (cell, i) => {
          return (<Cell key={i} value={cell} columnIndex={i} addToken={this.props.addToken} 
                player1={this.props.player1} player2={this.props.player2} />);
        }
      );
      return (
        <tr>{Row}</tr>
      );
  }
}

Row.propTypes = {
  row: PropTypes.array.isRequired,
  player1: PropTypes.string.isRequired,
  player2: PropTypes.string.isRequired,
  addToken: PropTypes.func.isRequired
}

export default Row;