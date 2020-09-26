const mongoose = require('mongoose');


const dietPlanSchema = new mongoose.Schema({
    foodName: {
        type: String,
        required: true
    },
    weight: {
        type: String,
        required: true
    },
    timeToEat: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, { timestamps: true });

module.exports = mongoose.model('DietPlan', dietPlanSchema);