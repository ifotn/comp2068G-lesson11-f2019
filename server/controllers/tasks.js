// instantiate an express router as usual
const express = require('express')
const router = express.Router()

// reference our Task model
const Task = require('../models/task')
const globals = require('../../config/globals')

// allow cross origin requests
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', globals.clientRoot);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    next()
})

/* GET all */
router.get('/', (req, res) => {
    // return all tasks
    Task.find((err, tasks) => {
        if (err) {
            return res.send(err).status(400)
        }
        else {
            res.json(tasks).status(200)
        }
    })
})

/* GET one */
router.get('/:_id', (req, res) => {
    // return selected task
    Task.findById(req.params._id, (err, task) => {
        if (err) {
            return res.send(err).status(400)
        }
        else {
            res.json(task).status(200)
        }
    })
})

/* POST */
router.post('/', (req, res) => {
    Task.create({
        name: req.body.name,
        complete: req.body.complete,
        priority: req.body.priority
    }, (err, task) => {
        if (err) { // send 400 - Bad Request
            return res.send(err).status(400)
        }
        else { // send 201 - Resource Created
            res.json(task).status(201)
        }
    })
})

// make public
module.exports = router
