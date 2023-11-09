const mongoose = require('mongoose');

const proposalSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    activities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }]
});

module.exports = mongoose.model('Proposals', proposalSchema);