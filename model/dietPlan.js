const mongoose = require('mongoose');


const dietPlanSchema = new mongoose.Schema({
    foodName: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    timeToEat: {
        type: timestamps,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, { timestamps: true });

module.exports = mongoose.model('DietPlan', dietPlanSchema);