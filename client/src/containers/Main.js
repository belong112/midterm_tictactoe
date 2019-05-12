import React from 'react';
import Board from './../components/Board';
var flag = 1;//use for checking the game still going

const socket = socketIOClient("http://localhost:3000");

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	apiResponse : "",
      squares : Array(9).fill(null), 
      turn : 1,
      winner : null
    };
  }

  socket.on('onlineusers',onlineusers:onlineusers)

  //determine if there is a winner
  sb_win(){
    const sq = this.state.squares;
    const lines = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]];

    // loop through the array of winning combinations
    for (let i = 0; i < lines.length; i += 1) {
      // destructure the indexes from the array of winning combinations
      const [a, b, c] = lines[i];
      // if the values in the squares array are the same (and not null) return the winner, else return null
      if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) {
        return sq[a];
      }
    }
    return null;
  };
  
  //when click anyspace 
  handleClick = (i) =>{
    console.log("1");
    var new_sq = this.state.squares;
    //check whether turn to o or x and make sure the spot is still null
    if(flag ===1 && new_sq[i]===null){
    	if(this.state.turn%2 === 1)
    		new_sq[i] = 'o'
    	else
    		new_sq[i] = 'x'
    	this.setState({
        turn : this.state.turn+1,
        squares : new_sq
      	})
    }

    socket.emit('change color', this.state.color)

    //if sb wins, game ended
    if(this.sb_win()!=null){
      this.setState({
        winner : this.sb_win()
      })
      flag = 0
    }
    //if all spots are occupied, the game ended
    if(this.state.turn === 9){
      flag = 0
    }
  };

  //set everything at the begining
  restart = () => {
    this.setState({
      squares : Array(10).fill(null),
      turn : 1,
      winner : null
    })
    flag = 1
  };


  render(){
  	// if winner 
    let boxClass = ['restart']
    if(!flag) {
      boxClass.push('unhidden');
    }
    var final_winner = ''
    if (this.state.winner === null)
    	final_winner = "It's a tie"
    else
    	final_winner = "Player "+ this.state.winner +" wins "

    return(
      <div className = "Game">
      	<h2>{this.state.apiResponse}</h2>
        <h1>Tic Tac Toe</h1>
        <Board handleClick = {(i) => this.handleClick(i)} squares = {this.state.squares} />
        <div className = {boxClass.join(' ')}>
          <p> {final_winner} </p>
          <button onClick = {this.restart}>restart</button>
        </div>
      </div>
    )
  }
}

export default Main;
