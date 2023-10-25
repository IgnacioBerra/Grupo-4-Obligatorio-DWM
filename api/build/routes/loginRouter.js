"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var jwt = require('jsonwebtoken');
const router = express_1.default.Router();
const secret = 'qhx578hjGrupoCuatro';
router.post('/', (req, res) => {
    const { username, password } = req.body; // Suponiendo que recibes el nombre de usuario y la contraseña del cliente
    // ... lógica para verificar las credenciales del usuario
    // Si las credenciales son válidas, genera y envía el token al cliente
    var token = jwt.sign({ user: username }, secret, { expiresIn: '10m' }); // username seria 'admin'
    res.json({ token }); // Envia el token al cliente
});
exports.default = router;
