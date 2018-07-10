import React from 'react';
import PropTypes from 'prop-types';

class Cell extends React.Component {

  render () {
    let color = 'white';
    if (this.props.value === this.props.player1) {
      color = 'black fall';
    } else if (this.props.value === this.props.player2) {
      color = 'red fall';
    }
      
    return (
      <td>
        <div className='cell' onClick={() => {this.props.addToken(this.props.columnIndex)}} >
          <div className={color} ></div>
        </div>
      </td>
    );
  }

};

Cell.propTypes = {
  value: PropTypes.string,
  player1: PropTypes.string.isRequired,
  player2: PropTypes.string.isRequired,
  addToken: PropTypes.func.isRequired,
  columnIndex: PropTypes.number.isRequired
}

export default Cell;