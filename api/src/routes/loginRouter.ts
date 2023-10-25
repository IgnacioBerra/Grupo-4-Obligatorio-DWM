import express from 'express';
var jwt = require('jsonwebtoken');
const router = express.Router();
const secret = 'qhx578hjGrupoCuatro';


router.post('/', (req, res) => {
    const { username, password } = req.body; // Suponiendo que recibes el nombre de usuario y la contraseña del cliente
    // ... lógica para verificar las credenciales del usuario
  
    if (username === 'admin' && password === 'grupo4') {
        // Si las credenciales son válidas, genera y envía el token al cliente
        var token = jwt.sign({ user: username }, secret, { expiresIn: '10m' }); // username seria 'admin'
        res.json({ token }); // Envia el token al cliente
        console.log(token);
    }else{
        res.status(401).json({ message: 'Credenciales inválidas. Acceso no autorizado.' });
    }
  });


export default router;