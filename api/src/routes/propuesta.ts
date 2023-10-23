import express from 'express';

const router = express.Router();

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

router.post('/agregar', (req, res) => {
    const nuevaPropuesta = {
        id: req.body.id,
        titulo: req.body.titulo,
        imagen: req.body.imagen
    };
    propuestas.push(nuevaPropuesta);
    res.json(nuevaPropuesta);
});

export default router;
