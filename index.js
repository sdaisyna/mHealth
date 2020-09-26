const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const userRouter = require('./routes/user');
const medicinePlanRouter = require('./routes/medicinePlan');
const exercisePlanRouter = require('./routes/exercisePlan');
const dietPlanRouter = require('./routes/dietPlan');

const dotenv = require('dotenv').config();

const cors = require('cors');

const app = express();
app.use(cors());
app.options('*', cors());
app.use(morgan('tiny'));


app.use(express.json());


mongoose.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then((db) => { //this is the connection with database
        console.log("Successfully connected to mongodb server.");
    }, (err) => console.log(err));



app.use('/user', userRouter);
app.use('/exerciseplan', exercisePlanRouter);
app.use('/dietplan', dietPlanRouter);
app.use('/medicineplan', medicinePlanRouter);

app.use((err, req, res, next) => { //error handling 
    console.error(err.stack);
    res.statusCode = 500;
    // res.send("Something wrong");
    res.json({ message: err.message });
})


app.listen(process.env.PORT, () => {
    console.log(`App is running at localhost:${process.env.PORT}`); //free formated string here we are concating PORT
});
