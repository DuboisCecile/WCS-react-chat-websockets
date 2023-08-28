const express = require('express');
const uniqid = require('uniqid'); // pour générer de faux identifiants de messages, car on n'a pas de BDD dans cet exemple, les messages seront stockés dans une mémoire, et disparaîtront à chaque redémarrage du serveur
const app = express();
const socketIO = require('socket.io');

const server = app.listen(3001); // on crée l'objet server express sur le port 3001

const io = socketIO(server, {
    cors: { origin: ['http://localhost:3000'] },
}); // on appelle le constructeur de socket.io en lui disant qu'on va sur le serveur qui écoute sur le port 3001 également accepter des connexions en websocket depuis le port 3000

const messages = [
    { id: uniqid(), author: 'server', text: 'welcome to WildChat' },
];

io.on('connect', (socket) => {
    console.log('user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
}); // On dit au socket io d'écouter les événements de connexion et de déconnexion des clients : à chaque fois qu'un client se connecte, il exécuté la fonction callback passée en paramètre. L'objet socket représente la connexion entre le serveur et un des clients. Sur cette socket, on programme un évènement. A chaque fois qu'un client se déconnecte, on exécute la fonction callback passée en paramètre.
