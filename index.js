const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

let port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log(`${socket.id} Connection`)
    socket.on('disconnect', () => {
        console.log(`${socket.id} Disconnection`)
    });
    socket.on('message', (message) => {
        console.log(`New message:\nAuthor: ${message.author}\nContent: ${message.content}\nDate: ${new Date(message.date)}`)
        io.emit('message', message)
    })
});

server.listen(port, () => {
  console.log('listening on *:3000');
});