import express from 'express';

const router = express.Router();

const activities = [
    { id: 1, titulo: 'jsd', imagen: 'kl' },
    { id: 2, titulo: 'oe', imagen: 'us' },
];

router.get('/', (req, res) => {
    res.send(activities);
});

router.get('/:activityId', (req, res) => {
    const activityId = parseInt(req.params.activityId);
    const activity = activities.find(activity => activity.id === activityId);
    if (!activity) {
        return res.status(404).json({ error: 'Activity not found.' });
    }else{
        return res.send(activity);
    } 
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



export default router;
