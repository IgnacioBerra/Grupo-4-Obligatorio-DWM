const start = require('../server');
const authenticateToken = require('../authMiddleware');
const express = require('express');
const qrcode = require('qrcode');
const router = express.Router();
const Game = require('../models/gameSchema');

router.get('/', authenticateToken, async (req, res) => {
  try {

    let sessionId = req.query.sessionId;

    const redirectUrl = `http://${process.env.URL_IP}:4200/game-user?sessionId=${sessionId}`;

    const options = {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      quality: 0.92,
      margin: 1,
    };

    const qrCodeBuffer = await qrcode.toBuffer(redirectUrl, options);
    res.set('Content-Type', 'image/png');
    //  res.send(qrCodeBuffer);
    const responseData = {
      qrCodeUrl: redirectUrl, 
      qrCodeBuffer: qrCodeBuffer.toString('base64') 
    };

    res.status(200).json(responseData);

  } catch (error) {
    console.error('Error al generar el código QR:', error);
    res.status(500).send('Error al generar el código QR');
  }
});


router.post('/actividades', authenticateToken, async (req, res) => {

  const partida = new Game({
    idSesion: req.body.idSesion,
    idPropuesta: req.body.idPropuesta,
    fechaDeJuego: req.body.fechaDeJuego,
    actividad: req.body.actividad,
    votos: req.body.votos
  });

  
  try {
    const nuevaPartida = await partida.save();
    res.status(201).json(nuevaPartida);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/actividades/:idSesion', authenticateToken, getGame, (req, res) => {
  res.json(res.partidas);
});

router.get('/actividades', async (req, res) => {
  try {
     partidas = await Game.find();
    res.json(partidas);
} catch (error) {
    res.status(500).json({ message: error.message });
}
});

router.patch('/actividades/:idSesion', authenticateToken, getGame, async (req, res) => {
  const actividadABuscar = req.body.actividad; 
  const voto = req.body.voto; 
  
  // filtro los juegos encontrados por la actividad especificada
  if (res.partidas && actividadABuscar) {
    juegoConActividadEspecifica = res.partidas.find(item => item.actividad === actividadABuscar);}
    
    if (juegoConActividadEspecifica) {    
      if (voto != null) {
        juegoConActividadEspecifica.votos.push(voto); //agrego voto 
        
      }
      try {
        const partidaActualizada = await juegoConActividadEspecifica.save();
        res.json(partidaActualizada);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    } else {
      res.status(404).json({ message: 'No se encontró juego con la actividad especificada' });
    }
});


//middleware para los metodos que necesitan buscar por id
async function getGame(req, res, next) {

  let partidas;
  try {
    partidas = await Game.find({ idSesion: req.params.idSesion });

    if (partidas.length === 0) {
      return res.status(404).json({ message: 'no se ha encontrado la partida' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
  res.partidas = partidas;
  next();
}

module.exports = router;