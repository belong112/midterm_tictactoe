import React from 'react';
import Square from './Square';

class Board extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    const squ = this.props.squares.map((square, index) => {
      return (
        <Square
          value={square}
          key={index}
          handleClick={() => this.props.handleClick(index)}
        />
      );
    })
    console.log(squ)
    return(
      <div className = "Board">
        {squ}
      </div>
    )
  }
}

export default Board;