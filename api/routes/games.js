const start = require('../server');
const authenticateToken = require('../authMiddleware');
const express = require('express');
const qrcode = require('qrcode');
const router = express.Router();
const Game = require('../models/gameSchema');

router.get('/', authenticateToken, async (req, res) => {
  try {
    
    let sessionId = req.query.sessionId;
    let propuestaId = req.query.propuestaId

    const redirectUrl = `http://${process.env.URL_IP}:4200/game-user/${sessionId}/${propuestaId}`;  
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


router.post('/actividades', async (req, res) => {

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

router.patch('/actividades/:idSesion', getGame, async (req, res) => {
  const actividadABuscar = req.body.actividad; 
  const voto = req.body.voto; 
  
  // filtro los juegos encontrados por la actividad especificada
  if (res.partidas && actividadABuscar) {
    juegoConActividadEspecifica = res.partidas.find(item => item.actividad === actividadABuscar && item.idSesion === req.params.idSesion);}
    
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

//nuevo
router.post('/countVotes/:idSesion', getGame, async (req, res) => {
  try {
    const result = [];

    const actividades = req.body;   
    console.log("Actividades " , actividades);
    actividades.forEach((tituloActividad) => {      
      let partidaAContar = res.partidas.find(item => item.actividad === tituloActividad.actividad && item.idSesion === req.params.idSesion);          
      result.push(countVotes(partidaAContar));
    });    
    // res.json(actividades);
    result.sort((a, b) => b[0].sum - a[0].sum);
    console.log("resultado: ", result);
    // result.forEach((element) => {
    //   element.forEach((item) =>{
    //     console.log(item.partidaAContar.actividad, item.partidaAContar.votos)
    //     resultadoTotal.push(item.partidaAContar.votos);
    //   })
    // })
    //result.sort((a, b) => b.votos < a.votos);
  
    //const ganador = result.slice(0, 1);
    //console.log("TODOS LOS VOOT", result)
    //console.log('Conteo de votos:', ganador);
    res.send(result[0]);
    
    
      // { idSesion: idSesion , actividad: actividad });

    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al contar los votos' });
  }
});

function countVotes(partidaAContar) {
  
  const result = [];
  let sum = 0;

  
  partidaAContar.votos.forEach((vote) => {

    sum += vote;
    
  });
  let p = partidaAContar.actividad;
  result.push({p , sum});
  console.log("PARTIDA A CONTAR ", partidaAContar.actividad)
    
  //result.sort((a, b) => b.votos < a.votos);

  //const ganador = result.slice(0, 1);

  return result;
  
}
//nuevo


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