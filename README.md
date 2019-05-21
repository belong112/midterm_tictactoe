Tic Tac Toe
==
A web-based tic tac toe that can allow users to play with other players online.

### How to start?

1. Clone the repository
2. Use `npm install` to install packages for backend
3. Then `cd client` and use `npm install` to install packages for front end
4. After installing, `cd ..` to go back to the root directory and use `node server.js` to run the server
5. Then `cd client` and use `npm start` to run the client
6. The website should now running on `localhost:3000`

### How it works?

* The first two users who goes into the page will be the player, the other will be spetator.(But i still got some bug here)
* Play the game. Everyones page will update immediately.
* It will show who wins the game. When game ends you can press restart button to restart the game.
* Save win time to database. I lock the player as Rick & Morty for now. But as you can see, their win time will be recorded. (Intend to add login page so that every user can have their own record)

### Development
* Client-side programs in React.js
* Server-side programs in Express (Node.js)
* Database in Mongodb

### My Contribution

* I reference css by this page : (https://codepen.io/borntofrappe/pen/rQGyxm) and use the components and containers model. But I rewrite some function to apply to my own project. 
* Added backend code, use socket.io to make it into a mutiplayer online game.
* Added a lot of condition, so that it can know who is the player who is spectator. Thus, only player can click the board. 


### Reflection
* To totally understand backend (like mongodb or scoket.io) is still tough for me.
* Hard to synchronize every users page.
* Learn react component lifecycle.
* It's hard to save or get data from mongodb, so i tired to mimic the chat code that teacher taught us at class. Meanwhile search for mongodb's manaul which makes it a bit easy.  
* Rick & Morty season 4 at nov,2019!!!!