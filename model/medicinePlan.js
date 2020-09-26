const mongoose = require('mongoose');


const medicinePlanSchema = new mongoose.Schema({
    medicineName: {
        type: String,
        required: true
    },
    timeToTake: {
        type: String,
        required: true
    },
    days: [{
        type: String,
        required: true
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, { timestamps: true });

module.exports = mongoose.model('MedicinePlan', medicinePlanSchema);