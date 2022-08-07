const express = require('express');
// const { redirect } = require('express/lib/response');
let router = express.Router();
const models_question = require('../models/question_models');

// question route
// get all the questions and answers
router.get('/', (req, res) => {
        models_question.questions_models.find()
            .then((result) => {
                res.send(result);
            })
            .catch((err) => {
                res.send(err)
                console.error(err)
            })
    })
    // create the question answers
router.post('/create', (req, res) => {
    console.log(req.body)
    models_question.questions_models.create(req.body)
        .then((result) => {
            res.send(result.title);
        })
        .catch((err) => {
            res.send(err)
            console.error(err)
        })
})
router.delete('/delete/:id', (req, res) => {
    console.log({ _id: req.params.id })
    models_question.questions_models.deleteMany({ _id: req.params.id })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err)
            console.error(err)
        })
})
router.put("/update/:id", (req, res) => {
    models_question.questions_models.updateOne({ _id: req.params.id }, { question: req.body.question, answers: req.body.answers, score: req.body.score })
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            res.send(err);
            console.error(err)
        })
})
module.exports = router;