const express = require('express')
const socketIO = require('socket.io')
const mongoose = require('mongoose')
const Message = require('./client/models/data')

// our localhost port
const port = 4000
var app = express()
const http = require('http').Server(app)

const server = require('http').createServer(app)

app.use(express.static('public'))
// our server instance
const serverSocket = require('socket.io')(http)
// This creates our socket using the instance of the server
const io = socketIO(server)

// http.listen(port, () => console.log(`Listening on port ${port}`))

//varibiles
var onlineusers = 0;
var squ = Array(10).fill(null);
var t = 1;


mongoose.connect('mongodb+srv://belong:112belong@cluster0-vqs9n.mongodb.net/test?retryWrites=true', {
    useNewUrlParser: true
})
db = mongoose.connection

db.on('error', error => {
    console.log(error)
})
db.once('open',()=>{
    console.log('MongoDB connected')
    io.on('connection', socket => {
        onlineusers++;
        io.sockets.emit('onlineusers',{onlineusers:onlineusers})
        
        Message.find()
            .limit(100)
            .sort({ _id: 1 })
            .exec((err, res) => {
                if (err) throw err
                
                socket.emit('test', res)
            })
        io.sockets.emit('init',{squares:squ,turn:t})

        socket.on('board_click',(data)=>{
            squ = data.squares;
            t = data.turn;
            io.sockets.emit('board_change',data) 
        })

        socket.on('game_end',(data)=>{             
            var query = {};
            query['name'] = data.name;

            // var message = Message.find();
            // console.log(message)

            // if(1){
            Message.findOneAndUpdate(
                query,
                {$inc:{win_time:1}},
                {new:true},
                (err, doc) => {
                    if (err) {
                        console.log("Something wrong when updating data!");
                    }
                }
            )
            // }
            // else{
            //     let name = data.name;
            //     let win_time = 1;
            //     const message = new Message({ name, win_time})
            //     message.save(err => {
            //         if (err) console.error(err)
            //     })
            //     console.log('db'); 
            // }
            
        })

        socket.on('restart',()=>{
            io.sockets.emit('restart')
            squ =  Array(10).fill(null);
            t = 1;
        })

        socket.on('disconnect',()=>{
            onlineusers--;
            io.sockets.emit('onlineusers',{onlineusers:onlineusers})
        })
    })
})

server.listen(port, () => console.log(`Listening on port ${port}`));

