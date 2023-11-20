const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    idSesion: {
        type: String,
        required: true
    },
    idPropuesta: {
        type: String,
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
    votos: {
        type: Array, 
        of: Number, 
        required: true
    }
});

module.exports = mongoose.model('Game', gameSchema);