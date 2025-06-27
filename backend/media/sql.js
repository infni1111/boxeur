import Fastify from 'fastify';
import fastifyPosgres from '@fastify/postgres';
import { Server } from 'socket.io';

const fastify = Fastify({
  logger: true,
});

fastify.register(fastifyPosgres, {
  connectionString: 'postgres://admin:admin@localhost:5433/db',
  max: 10000,
});

const io = new Server(fastify.server, {
  cors: {
    origin: "http://localhost:5173", // Autoriser toutes les origines temporairement
    methods: ["GET", "POST"]
  },
  pingTimeout: 10000, // Temps d'attente avant déconnexion (10 secondes)
  pingInterval: 10000, // Envoi des pings toutes les 5 secondes
  ackTimeout: 10000, // Temps en millisecondes
});

// Gestion des événements de connexion et déconnexion
io.on('connection', (socket) => {
  console.log(`Un utilisateur s'est connecté : ${socket.id}`);

  // Exemple de gestionnaire d'événement personnalisé
  socket.on('message', (data) => {
    console.log(`Message reçu : ${data}`);
    // Vous pouvez envoyer une réponse à ce client
    socket.emit('messageResponse', 'Message reçu');
  });

  // Gérer la déconnexion
  socket.on('disconnect', () => {
    console.log(`L'utilisateur avec l'ID ${socket.id} s'est déconnecté`);
  });

  // Vous pouvez également gérer les événements spécifiques à un utilisateur
  socket.on('joinRoom', (room) => {
    socket.join(room);
    console.log(`${socket.id} a rejoint la salle ${room}`);
  });
});

// Démarrer le serveur Fastify
fastify.listen({ port: 5000, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Serveur Fastify avec Socket.IO en écoute sur ${address}`);
});
