const mongoose = require('mongoose');
const Activity = require('./activitiesSchema');

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
    }/*,
    activities: [{type:Activity}]*/
});

module.exports = mongoose.model('Proposals', proposalSchema);