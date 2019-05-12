import React from 'react';

class Square extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <button className = "Square" onClick = {this.props.handleClick}>
        {this.props.value}
      </button>
    )
  }
}

export default Square;