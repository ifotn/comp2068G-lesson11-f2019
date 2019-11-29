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
        else { // 200: OK
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

/* DELETE */
router.delete('/:_id', (req, res) => {
    Task.remove({ _id: req.params._id }, (err, task) => {
        if (err) {
            return res.send(err).status(400)
        }
        else { // send 204 - No Content
            res.json(task).status(204)
        }
    })
})

/* PUT (UPDATE) */
router.put('/:_id', (req, res) => {
    Task.update({ _id: req.params._id }, req.body, (err, task) => {
        if (err) {
            return res.send(err).status(400)
        }
        else { // send 202 - Accepted
            res.json(task).status(202)
        }
    })
})

// make public
module.exports = router
