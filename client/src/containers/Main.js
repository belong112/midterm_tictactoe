import React from 'react';
import socketIOClient from "socket.io-client";
import Board from './../components/Board';

var flag = 1;//use for checking the game still going
let identity = 'spectator';
let Morty_win = 0;
let Rick_win = 0;
// const socket = io.connect("http://localhost:3000");
const socket = socketIOClient("localhost:4000");

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares : Array(9).fill(null), 
      turn : 1,
      winner : null
    };
  }

  //determine if there is a winner
  sb_win(sq){
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
    var new_sq = this.state.squares;
    //check whether turn to o or x and make sure the spot is still null
    // if(this.state.turn === 1 && identity ==='player')
    // 	identity = 'player O'
    // else if(this.state.turn === 2 && identity ==='player')
    // 	identity ='player X'

    if(flag === 1 && new_sq[i]===null){	
    	if(identity === 'Rick' && this.state.turn%2 === 1){
    		new_sq[i] = 'o'
    		this.setState({
        	turn : this.state.turn+1,
        	squares : new_sq
      	})
      	socket.emit('board_click',{
    			squares : new_sq,
    			turn : this.state.turn+1
				})
    	}
    	else if(this.state.turn%2 === 0 &&  identity ==='Morty'){
    		new_sq[i] = 'x'
	    	this.setState({
	        turn : this.state.turn+1,
	        squares : new_sq
	      })
	       socket.emit('board_click',{
		    	squares : new_sq,
		    	turn : this.state.turn+1
				})
	    }  
		}
     

    //if sb wins, game ended
    if(flag === 1 && this.sb_win(new_sq)!=null){
      this.setState({
        winner : this.sb_win(new_sq)
      })
      flag = 0
      if(this.sb_win(new_sq) === 'o')
      	socket.emit('game_end',{name:'Rick'})
      else if(this.sb_win(new_sq) === 'x')
      	socket.emit('game_end',{name:'Morty'})
    }
    //if all spots are occupied, the game ended
    if(this.state.turn === 9)
      flag = 0
    
  };

  //set everything at the begining
  restart = () => {
  	let arr = Array(10).fill(null)
    this.setState({
      squares : arr,
      turn : 1,
      winner : null
    })
    flag = 1

    socket.emit('restart')
  };

 	componentDidMount(){
 		//if new player get online change total users & change user
		socket.on('onlineusers', i =>{
	  let people = i.onlineusers;
	  	if (people === 1 && identity ==='spectator')
	  		identity = 'Rick';
	  	else if(people === 2 && identity === 'spectator')
	  		identity = 'Morty';
	  	console.log(identity)
		});

		socket.on('test',data=>{
			Morty_win = data[0].win_time
			Rick_win = data[1].win_time
			this.setState({
				turn:this.state.turn
			})
		})

		socket.on('init',data=>{
			console.log(data.squares)
			let t = data.turn
	  	let squ = data.squares
	  	this.update([t,squ])
	  	this.setState({
	  		turn : t,
	  		squares : squ
	  	})
		})

		// change the board
	  socket.on('board_change',(data)=>{
	  	let t = data.turn
	  	let squ = data.squares
	  	this.update([t,squ])
	  	this.setState({
	  		turn : t,
	  		squares : squ
	  	})
	  })  

	  //reset the board
	  socket.on('restart',()=>{
	  	let arr = Array(10).fill(null)
	  	flag = 1
	    this.setState({
	      squares : arr,
	      turn : 1,
	      winner : null
	    })
 		})
 	}

 	// update the board after changing
 	update = (t) =>{
 		if(this.sb_win(t[1])!=null){
      this.setState({
        winner : this.sb_win(t[1])
      })
      flag = 0
      if(this.sb_win(t[1]) === 'o')
      	Rick_win++
      else if(this.sb_win(t[1]) === 'x')
      	Morty_win++
    }
    //if all spots are occupied, the game ended
    if(t[0] === 10)
      flag = 0
 	}


  render(){
  	let boxClass2 = [];
  	let boxClass3 = [];
  	let boxClass = ['restart']
    if(!flag) {
      boxClass.push('unhidden');
    }
    if(this.state.turn % 2 === 1)
    	boxClass2.push('underline');
    else
    	boxClass3.push('underline')

    let final = ''
   	if (this.state.winner === null)
    	final = "It's a tie"
    else if(this.state.winner === 'o')
    	final = "Rick wins !"
    else
    	final = "Morty wins !"

    return(
    	<div>
    		<h1>Tic Tac Toe</h1>
	      <div className = "Game">      	
	      	<div className="counter"> 
	        	<h2 className = {boxClass2.join(' ')}>Rick</h2> 
	        	<h2> {Rick_win} </h2>
	        	<h2> wins </h2> 
	        </div>
	        <div>       
		        <Board handleClick = {(i) => this.handleClick(i)} squares = {this.state.squares} />
		        <h5>you are {identity}</h5>
		        <div className = {boxClass.join(' ')}>
		          <p> {final} </p>
		          <button onClick = {this.restart}>restart</button>
		        </div>
		      </div>
		      <div className="counter"> 
	        	<h2 className = {boxClass3.join(' ')}>Morty</h2>
	        	<h2> {Morty_win} </h2>
	        	<h2> wins </h2> 
	        </div>
	      </div>
      </div>
    )
  }
}

export default Main;
