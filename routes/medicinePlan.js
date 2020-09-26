const express = require('express');
const MedicinePlan = require('../model/medicinePlan');

const auth = require('../auth');
const router = express.Router();


router.get("/mymedicineplan", auth.verifyUser, (req, res, next) => {
    MedicinePlan.find({ user: req.user._id })
        .then((medicines) => {
            res.json(medicines)
        }).catch(next);
})

router.post("/", auth.verifyUser, (req, res, next) => {
    let medicine = new MedicinePlan(req.body);
    medicine.user = req.user._id;
    medicine.save()
        .then((medicine) => {
            res.statusCode = 201;
            res.json(medicine);
        })
        .catch(next);

});

router.put("/", auth.verifyUser, (req, res) => {
    res.statusCode = 405;
    res.json({ message: "Sorry! Cannot make an update" });
})

router.delete("/", auth.verifyUser, (req, res, next) => {
    MedicinePlan.deleteMany({})
        .then((reply) => {
            res.json(reply);
        })
        .catch(next);
});


//Specific medicine plan detail with :id
router.route('/:id')
    .get((req, res, next) => {
        console.log(req.params.id)
        MedicinePlan.findOne({ _id: req.params.id })
            .populate("user")
            .exec()
            .then(medicine => {
                if (medicine == null) throw new Error("This plan have been removed.");
                res.json(medicine);
            })
            .catch(next);

    })
    .post(auth.verifyUser, (req, res, next) => {
        res.statusCode = 405;
        res.json({ messsage: "Method not supported" });
    })

    .put(auth.verifyUser, (req, res, next) => {
        MedicinePlan.findOneAndUpdate({ user: req.user._id, _id: req.params.id }, { $set: req.body }, { new: true })
            .then((reply) => {
                if (reply == null) throw new Error("This plan update failed.");
                res.json(reply);
            }).catch(next);

    })

    .delete(auth.verifyUser, (req, res, next) => {
        MedicinePlan.findOneAndDelete({ user: req.user._id, _id: req.params.id })
            .then((medicine) => {
                if (medicine == null) throw new Error("No plan found.")
                res.json(medicine);
            })
            .catch(next);
    });

module.exports = router;
