const express = require('express');
const DietPlan = require('../model/dietPlan');

const auth = require('../auth');
const router = express.Router();


router.get("/mydietplan", auth.verifyUser, (req, res, next) => {
    DietPlan.find({ user: req.user._id })
        .then((diet) => {
            res.json(diet)
        }).catch(next);
})

router.post("/", auth.verifyUser, (req, res, next) => {
    let diet = new DietPlan(req.body);
    diet.user = req.user._id;
    diet.save()
        .then((diet) => {
            res.statusCode = 201;
            res.json(diet);
        })
        .catch(next);

});

router.put("/", auth.verifyUser, (req, res) => {
    res.statusCode = 405;
    res.json({ message: "Sorry! Cannot make an update" });
});

router.delete("/", auth.verifyUser, (req, res, next) => {
    DietPlan.deleteMany({})
        .then((reply) => {
            res.json(reply);
        })
        .catch(next);
});


//Specific medicine plan detail with :id
router.route('/:id')
    .get((req, res, next) => {
        console.log(req.params.id)
        DietPlan.findOne({ _id: req.params.id })
            .populate("user")
            .exec()
            .then(diet => {
                if (diet == null) throw new Error("This plan have been removed.");
                res.json(diet);
            })
            .catch(next);

    })
    .post(auth.verifyUser, (req, res, next) => {
        res.statusCode = 405;
        res.json({ messsage: "Method not supported" });
    })
    .put(auth.verifyUser, (req, res, next) => {
        DietPlan.findOneAndUpdate({ user: req.user._id, _id: req.params.id }, { $set: req.body }, { new: true })
            .then((reply) => {
                if (reply == null) throw new Error("This plan update failed.");
                res.json(reply);
            }).catch(next);

    })
    .delete(auth.verifyUser, (req, res, next) => {
        DietPlan.findOneAndDelete({ user: req.user._id, _id: req.params.id })
            .then((diet) => {
                if (diet == null) throw new Error("No plan found.")
                res.json(diet);
            })
            .catch(next);
    });

module.exports = router;
