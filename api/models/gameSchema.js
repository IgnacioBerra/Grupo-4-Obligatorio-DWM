const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    idSesion: {
        type: String,
        required: true
    },
    idPropuesta: {
        type: Number,
        required: true
    },
    fechaDeJuego: {
        type: Date,
        required: true
    },
    actividad: {
        type: String,
        required: true
    },
    voto: {
        type: String,
        required: true
    } 
});

module.exports = mongoose.model('Game', gameSchema);
