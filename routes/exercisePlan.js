const express = require('express');
const ExercisePlan = require('../model/exercisePlan');

const auth = require('../auth');
const router = express.Router();


router.get("/myexerciseplan", auth.verifyUser, (req, res, next) => {
    ExercisePlan.find({ user: req.user._id })
        .then((exercises) => {
            res.json(exercises)
        }).catch(next);
})

router.post("/", auth.verifyUser, (req, res, next) => {
    let exercise = new ExercisePlan(req.body);
    exercise.user = req.user._id;
    exercise.save()
        .then((exercise) => {
            res.statusCode = 201;
            res.json(exercise);
        })
        .catch(next);

});

router.put("/", auth.verifyUser, (req, res) => {
    res.statusCode = 405;
    res.json({ message: "Sorry! Cannot make an update" });
});

router.delete("/", auth.verifyUser, (req, res, next) => {
    ExercisePlan.deleteMany({})
        .then((reply) => {
            res.json(reply);
        })
        .catch(next);
});


//Specific exercise plan detail with :id
router.route('/:id')
    .get((req, res, next) => {
        console.log(req.params.id)
        ExercisePlan.findOne({ _id: req.params.id })
            .populate("user")
            .exec()
            .then(exercise => {
                if (exercise == null) throw new Error("This plan have been removed.");
                res.json(exercise);
            })
            .catch(next);

    })
    .post(auth.verifyUser, (req, res, next) => {
        res.statusCode = 405;
        res.json({ messsage: "Method not supported" });
    })

    .put(auth.verifyUser, (req, res, next) => {
        ExercisePlan.findOneAndUpdate({ user: req.user._id, _id: req.params.id }, { $set: req.body }, { new: true })
            .then((reply) => {
                if (reply == null) throw new Error("This plan update failed.");
                res.json(reply);
            }).catch(next);

    })
    .delete(auth.verifyUser, (req, res, next) => {
        ExercisePlan.findOneAndDelete({ user: req.user._id, _id: req.params.id })
            .then((exercise) => {
                if (exercise == null) throw new Error("No plan found.")
                res.json(exercise);
            })
            .catch(next);
    });

module.exports = router;
