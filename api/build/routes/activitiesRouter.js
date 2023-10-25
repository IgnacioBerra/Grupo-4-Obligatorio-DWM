"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const activities = [
    { id: 1, titulo: 'jsd', imagen: 'kl' },
    { id: 2, titulo: 'oe', imagen: 'us' },
];
router.get('/', (req, res) => {
    res.send(activities);
});
router.post('/addActivity', (req, res) => {
    const newActivity = {
        id: req.body.id,
        titulo: req.body.titulo,
        imagen: req.body.imagen
    };
    activities.push(newActivity);
    res.json(newActivity);
});
router.put('/modifyActivity/:id', (req, res) => {
    const activityId = parseInt(req.params.id);
    const updatedActivity = req.body;
    const index = activities.findIndex(activity => activity.id === activityId);
    if (index === -1) {
        return res.status(404).json({ error: 'Activity not found.' });
    }
    activities[index] = {
        id: activityId,
        titulo: updatedActivity.titulo,
        imagen: updatedActivity.imagen
    };
    return res.json(activities[index]);
});
exports.default = router;
