require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // Agrega esta línea para importar el módulo path

mongoose.connect(process.env.DATABASE_URL), { useNewUrlParser: true };
const db = mongoose.connection;
db.on('error', (error) => console.error(error))
db.once('open', () => console.error("connected to database"))

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:4200',
}));

const proposalRouter = require('./routes/proposal.js');
const activityRouter = require('./routes/activities.js');
const loginRouter = require('./routes/login.js');
const gamesRouter = require('./routes/games.js');

app.use('/proposal', proposalRouter);
app.use('/activities', activityRouter);
app.use('/login', loginRouter);
app.use('/game', gamesRouter);

// Servir el archivo QR estático
app.use('/qr', express.static(path.join(__dirname, 'qr'))); //esto es para poder acceder a la imagen desde localhost...

app.listen(3000, () => console.log('Server started'));

