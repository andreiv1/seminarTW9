let express = require('express')
let router = express.Router()
const Task = require("../models/task")

const checkId = (req, res, next) => {
    if (req.params.id && isNaN(req.params.id)) {
        res.status(400).json({"error" : "wrong input for id"})
    } else {
        next();
    }
}

router.route('/getTask/:id').get(checkId, async (req, res) => {
    try{
        const task = await Task.findByPk(req.params.id);
        if(task) {
            res.status(200).json(task);
        } else {
            res.status(404).json({"error" : `Task with id ${req.params.id} not found!`})
        }
    } catch(err){
        res.status(500).json(err)
    }

})

router.route('/getTasks').get(async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.status(200).json(tasks);
    } catch(err){
        res.status(500).json(err);
    }
})

router.route('/addTask').post(async (req, res) => {
    try{
        const newTask = await Task.create(req.body);
        res.status(200).json(newTask);
    } catch(err){
        res.status(500).json(err);
    }
})

router.route('/modifyTask/:id').put(async (req, res) => {
    try{
        const task = await Task.findByPk(req.params.id)
        if(task){
            const updatedTask = await task.update(req.body);
            res.status(200).json(updatedTask);
        } else {
            res.status(404).json({"error" : `Task with id ${req.params.id} not found!`});
        }
    } catch(err) {
        res.status(500).json(err);
    }
})

router.route('/deleteTask/:id').delete(async (req, res) => {
    try{
        Task.destroy({
            where: {
                id: req.params.id
            }
        })
        .then((rows) => {
            if(rows === 1){
                res.status(200).json({"error" : `Task with id ${req.params.id} deleted`});
            } else {
                res.status(404).json({"error" : `Task with id ${req.params.id} not found!`});
            }
        })
    }
    catch(err){

    }
})

module.exports = router;