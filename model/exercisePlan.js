const mongoose = require('mongoose');


const exercisePlanSchema = new mongoose.Schema({
    exerciseName: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    days: {
        type: String,
        required: true
    },
    exerciseType: {
        type: String,
        required: true
    },
    exerciseTime: {
        type: timestamps,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, { timestamps: true });

module.exports = mongoose.model('ExercisePlan', exercisePlanSchema);