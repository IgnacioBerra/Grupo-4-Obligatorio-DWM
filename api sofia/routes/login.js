const express = require('express');
const jwt =require('jsonwebtoken');
const User = require('../models/userSchema');

const router = express.Router();
const secret = 'qhx578hjGrupoCuatro';

router.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }
/*
        // Verifica si la contraseña proporcionada coincide con la contraseña almacenada en la base de datos
        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }
*/
        // Si las credenciales son válidas, genera un token JWT y responde al cliente
        const token = jwt.sign({ user: user.username }, secret, { expiresIn: '10m' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;