const start = require('../server');

const express = require('express');
const qrcode = require('qrcode');
const router = express.Router();


router.get('/', async  (req, res) => {
  try {
  const redirectUrl = `http://${process.env.URL_IP}:4200/game`; 

  const options = {
    errorCorrectionLevel: 'H',
    type: 'image/png',
    quality: 0.92,
    margin: 1,
  };

  const qrCodeBuffer = await qrcode.toBuffer(redirectUrl, options);
  res.set('Content-Type', 'image/png');
  res.send(qrCodeBuffer);
  } catch (error) {
    console.error('Error al generar el código QR:', error);
    res.status(500).send('Error al generar el código QR');
  }
});


// router.post('/start', (req, res) => {

//   console.log("AAAAAAAAAAAAAAAAAAAA");
//   console.log(req.body.id);
//   console.log("AAAAAAAAAAAAAAAAAAA");
//   start(req.body);
// });


module.exports = router;