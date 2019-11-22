// instantiate an express router as usual
const express = require('express')
const router = express.Router()

// reference our Task model
const Task = require('../models/task')

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

// make public
module.exports = router
