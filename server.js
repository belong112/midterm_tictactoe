const express = require('express')
const socketIO = require('socket.io')
const mongoose = requ

// our localhost port
const port = 3000
const app = express()
const http = require('http').Server(app)

app.use(express.static('public'))
// our server instance
const serverSocket = require('socket.io')(http)
// This creates our socket using the instance of the server
const io = socketIO(server)

http.listen(port, () => console.log(`Listening on port ${port}`))

//varibiles
var onlineusers = 0;

mongoose.connect('<MLAB_MONGODB_URL>', {
    useNewUrlParser: true
})
db = mongoose.connection

db.on('error', error => {
    console.log(error)
})
db.once('open', () => {
    console.log('MongoDB connected!')
    serverSocket.on('connection', socket => {

    		onlineusers++;
    		socket.on('onlineusers':onlineusers:onlineusers)

        // const sendStatus = s => {
        //     socket.emit('status', s)
        // }

        // // First time running
        // Message.find()
        //     .limit(100)
        //     .sort({ _id: 1 })
        //     .exec((err, res) => {
        //         if (err) throw err

        //         socket.emit('init', res)
        //     })

        // socket.on('input', data => {
        //     let name = data.name
        //     let body = data.body

        //     // Check for name and message
        //     if (name == '' || body == '') {
        //         // Send error status
        //         sendStatus('Please enter a name and message')
        //     } else {
        //         // Insert message
        //         const message = new Message({ name, body })
        //         message.save(err => {
        //             if (err) console.error(err)

        //             serverSocket.emit('output', [data])

        //             // Saved!
        //             sendStatus({
        //                 message: 'Message sent',
        //                 clear: true
        //             })
        //         })
        //     }
        // })

        // socket.on('clear', () => {
        //     // Remove all chats from collection
        //     Message.deleteMany({}, () => {
        //         // Emit cleared
        //         socket.broadcast.emit('cleared')
        //     })
        // })
    })
})