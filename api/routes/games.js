const express = require('express');
const qrcode = require('qrcode');
const { v4: uuidv4 } = require('uuid');
const path = require('path'); // Agrega esta línea para importar el módulo path

const router = express.Router();

router.get('/', (req, res) => {
  const partidaId = uuidv4(); // Genera un ID único para la partida
  const redirectUrl = `https://www.youtube.com/watch?v=DVjXTzsw-nQ&ab_channel=HighVenus/${partidaId}`;
  // const qrFileName = `${partidaId}.png`; // si quiero guardar los qr de cada partida en la bdd al dope igual
  const qrFileName = 'qr.png'; 

  // Genera la ruta completa del archivo de imagen
  const qrFilePath = path.join(__dirname, '..', 'qr', qrFileName);

  // Genera el código QR con el ID de la partida en la URL
  qrcode.toFile(qrFilePath, redirectUrl, (err) => {
    if (err) {
      console.error('Error al generar el código QR:', err);
      res.status(500).send('Error al generar el código QR');
    } else {
      console.log('Código QR generado correctamente');
      // const qrUrl = `http://localhost:3000/qr/${qrFileName}`; // Crea la URL completa del código QR      
      // res.json({ qrUrl: qrUrl }); // Envía la URL del código QR generado como respuesta
      res.json({ qrFilePath: qrFilePath }); 
    }
  });
});

module.exports = router;
