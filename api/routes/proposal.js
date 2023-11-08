const express = require('express');
const router = express.Router();
const Proposal = require('../models/proposalSchema');
const authenticateToken = require('../authMiddleware');

router.get('/',authenticateToken, async (req, res) => {
    try {
        const proposals = await Proposal.find()
        res.json(proposals);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/:id', getProposal, (req, res) => {
    res.json(res.proposal);
})

router.post('/', authenticateToken, async (req, res) => {
    const proposal = new Proposal({
        id: req.body.id,
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        activities: req.body.activities
    })
    try {
        const newProposal = await proposal.save();
        res.status(201).json(newProposal)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

//actualizar propuesta
router.patch('/:id', getProposal, async (req, res) => {
if (req.body.title!=null) {
    res.proposal.title=req.body.title
}
if (req.body.description!=null) {
    res.proposal.description=req.body.description
}
if (req.body.image!=null) {
    res.proposal.image=req.body.image
}
if (req.body.activities!=null) {
    res.proposal.activities=req.body.activities
}

try {
    const updateProposal= await res.proposal.save();
    res.json(updateProposal);
} catch (error) {
    res.status(400).json({message: error.message});
}
})


router.delete('/:id', getProposal, async (req, res) => {
    console.log(res.proposal.id);
    try {
        await res.proposal.deleteOne();
        res.json({ message: 'se ha borrado la propuesta' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


//middleware para los metodos que necesitan buscar por id
async function getProposal(req, res, next) {
    console.log(req.params.id);
    let proposal;
    try {
        proposal = await Proposal.findById(req.params.id)
        if (proposal == null) {
            return res.status(404).json({ message: 'no se ha encontrado la propuesta' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.proposal = proposal;
    next();
}



module.exports = router;