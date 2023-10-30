import express from 'express';
const { findUser } = require('../../../BDD/conexion.ts');
var jwt = require('jsonwebtoken');
const router = express.Router();
const secret = 'qhx578hjGrupoCuatro';

router.post('/', (req, res) => {
    let username = req.body.User;
    let password = req.body.PassWord;
    console.log(req.body);
    console.log(req.body.User);
    console.log(req.body.PassWord);


    const promesaUsuarioValido = new Promise<boolean>((resolve, reject) => {
        findUser(username, password)
            .then((isValid: boolean) => {
                resolve(isValid);
            })
            .catch((error: any) => {
                reject(error);
            });
    });

    promesaUsuarioValido
        .then((isValid: boolean) => {
            if (isValid) {
                var token = jwt.sign({ user: username }, secret, { expiresIn: '10m' });
                res.json({ token, valido: true });
            } else {
                res.status(401).json({ message: 'Credenciales inválidas. Acceso no autorizado.', valido: false });
            }
        })
        .catch((error: any) => {
            res.status(500).json({ message: 'Error en el servidor', valido: false });
        });
});

export default router;
