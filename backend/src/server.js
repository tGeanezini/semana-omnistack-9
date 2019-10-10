const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes');

const app = express();
const server = http.Server(app); // Extrai o servidor http do express
const io = socketio(server); // Faz com que o server consiga escutar o protocolo websocket

mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-rb9ck.mongodb.net/semanaomni?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const connectedUsers = {}; // Não recomendado para produção, melhor usar um banco rápido (ex: Redis)

io.on('connection', socket => {
    const { user_id } = socket.handshake.query;

    connectedUsers[user_id] = socket.id;
});

// Sem o 'next' a execução pararia nessa função e não avançaria para as que estão embaixo
app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads'))); // Usado pelo express para retornar arquivos estáticos (pdf, imagens, etc)
app.use(routes);

server.listen(3333);

