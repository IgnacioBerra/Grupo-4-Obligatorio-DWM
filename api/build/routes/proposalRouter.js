"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const propuestas = [
    { id: 12, titulo: 'HOLA', imagen: 'jksd' },
    { id: 13, titulo: 'HOLA', imagen: 'jksd' },
    { id: 14, titulo: 'HOLA', imagen: 'jksd' },
    { id: 15, titulo: 'HOLA', imagen: 'jksd' },
    { id: 16, titulo: 'HOLA', imagen: 'jksd' },
    { id: 17, titulo: 'HOLA', imagen: 'jksd' },
    { id: 18, titulo: 'HOLA', imagen: 'jksd' },
    { id: 19, titulo: 'HOLA', imagen: 'jksd' },
    { id: 20, titulo: 'HOLA', imagen: 'jksd3' }
];
router.get('/', (req, res) => {
    res.send(propuestas);
});
router.post('/addProposal', (req, res) => {
    const nuevaPropuesta = {
        id: req.body.id,
        titulo: req.body.titulo,
        imagen: req.body.imagen
    };
    propuestas.push(nuevaPropuesta);
    res.json(nuevaPropuesta);
});
exports.default = router;
