const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema'); 
const router = express.Router();
const secret = 'qhx578hjGrupoCuatro';
const bcrypt = require('bcrypt');


router.post('/', async (req, res) => {
    try {
        const username = req.body.User;
        const password = req.body.PassWord;

        const isValid = await findUser(username, password);

        if (isValid) {
            const token = jwt.sign({ user: username }, secret, { expiresIn: '10m' });
            res.json({ token, valido: true });
        } else {
            res.status(401).json({ message: 'Credenciales inválidas. Acceso no autorizado.', valido: false });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', valido: false });
    }
});

async function findUser(username, passwordCheck) {
    try {
        const userFind = await User.findOne({ username }); // Utiliza el modelo de usuario correctamente

        if (userFind) {
            const passwordMatches = await bcrypt.compare(passwordCheck, userFind.password);
            if (passwordMatches) {
                console.log("Coincidió.");
                return true;
            } else {
                console.log("No coincide");
                console.log("Stored Password:", userFind.password);
                return false;
            }
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error al buscar el usuario:", error);
        return false;
    }
}


router.post('/addUser', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
        username: req.body.username,
        password: hashedPassword
    });
    try {
        const newUser = await user.save();
        res.status(201).json(newUser)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
    
});


module.exports = router;
