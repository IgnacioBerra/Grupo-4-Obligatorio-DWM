require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log("connected to database"));

app.use(express.json());

app.use(cors({
    // origin: 'http://localhost:4200',
    origin: `http://${process.env.URL_IP}:4200`,
}));

const proposalRouter = require('./routes/proposal.js');
const activityRouter = require('./routes/activities.js');
const loginRouter = require('./routes/login.js');
const gamesRouter = require('./routes/games.js');

app.use('/proposal', proposalRouter);
app.use('/activities', activityRouter);
app.use('/login', loginRouter);
app.use('/game', gamesRouter);

const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        // origin: 'http://localhost:4200',
        origin: `http://${process.env.URL_IP}:4200`,
        methods: ["GET", "POST"]
    }
});

http.listen(3000, () => {
    console.log('Server started port 3000');
});


const usuariosConectados = new Map();

io.on('connection', socket => {
  let uniqueId;

  socket.on('usuario-conectado', (uuid) => {
    console.log('User connected:', uuid);
    usuariosConectados.set(uuid, true);
    uniqueId = uuid;
    io.emit('user-count', usuariosConectados.size); // Envía el recuento actual de usuarios conectados
  });

    socket.on('nuevo-usuario', (userName) => {
        socket.emit('add-usuario', userName);
    });

    socket.on("iniciarJuego", (actividadId) => {        
        socket.emit("iniciarActividad",actividadId); //probar hacer broadcast
    });

    
    socket.on("actividad-pantalla", (actividad) =>
    {
        //logica para que con un timeOut vaya emitiendo cada cierto tiempo la 'actividad'
        
    });

    socket.on('disconnect', () => {
        if(uniqueId){
        console.log('User disconnected', uniqueId);
        // Elimina al usuario desconectado del mapa
        usuariosConectados.delete(uniqueId);
        
        io.emit('user-count', usuariosConectados.size); // Envía el recuento actual de usuarios conectados
        }
      });

    
});

