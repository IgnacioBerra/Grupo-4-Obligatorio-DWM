

require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

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

app.listen(3000, () => console.log('Server started'));

const io = require('socket.io')(3333,{
    cors:{
        origin:["http://localhost:4200"],
    },
})

io.on("connection",socket =>{
    console.log(socket.id)
    socket.on("iniciarJuego", (actividadId) => {
        socket.broadcast.emit("iniciarActividad",actividadId)
    })

})


