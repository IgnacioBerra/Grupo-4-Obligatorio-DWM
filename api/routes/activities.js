const express = require('express');
const router = express.Router();
const Activity = require('../models/activitiesSchema'); 
const authenticateToken = require('../authMiddleware');

router.get('/',authenticateToken ,async (req, res) => {
    try {
        const activities = await Activity.find();
        res.json(activities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id' ,getActivity, (req, res) => {
    res.json(res.activity);
});

router.post('/',async (req, res) => {
    const activity = new Activity({
        title: req.body.title,
        description: req.body.description,
        image: req.body.image
    });
    try {
        const newActivity = await activity.save();
        res.status(201).json(newActivity);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.patch('/:id', authenticateToken, getActivity, async (req, res) => {
    if (req.body.title != null) {
        res.activity.title = req.body.title;
    }
    if (req.body.description != null) {
        res.activity.description = req.body.description;
    }
    if (req.body.image != null) {
        res.activity.image = req.body.image;
    }

    try {
        const updatedActivity = await res.activity.save();
        res.json(updatedActivity);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', getActivity, authenticateToken, async (req, res) => {
    try {
        await res.activity.deleteOne();
        res.json({ message: 'Se ha borrado la actividad' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Middleware para buscar actividades por ID
async function getActivity(req, res, next) {
    let activity;
    try {
        activity = await Activity.findById(req.params.id);
        if (activity == null) {
            return res.status(404).json({ message: 'No se ha encontrado la actividad' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.activity = activity;
    next();
}

module.exports = router;
