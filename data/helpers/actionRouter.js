const express = require('express');

 const actions = require('./actionModel.js');
const project = require('./projectModel.js');
 const router = express.Router()

 //get actions from id
router.get('/actionss/:id', validateactions, (req, res) => {
    actions.get(req.action)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(() => {
            res.status(500).json({Error: 'could not retrive the actions from the database'})
        })
})

//post an actions
router.post("/projects/:id/actions", validatePost, (req, res) => {
    const {description, notes} = req.body;
    req.body.project_id = req.project
    
    if (!description || !notes) {
        res.status(400).json({Denied: `You must provide a description and notes`})
    } else {
        actions.insert(req.body)
            .then(action => {
                res.status(201).json(action)
            })
            .catch(err => {
                res.status(500).json({Error: 'there was an issue createing the actions for the project'})
            })
    }
})


router.delete("/actions/:id", validateAction, (req, res) => {
    adb.remove(req.action)
        .then(num => {
            res.status(200).json({Sucess: `${num} items were sucessfully deleted`})
        })
        .catch(() => {
            res.status(500).json({Error: "there was an error deleteing the action from the database"})
        })
})

router.put("/actions/:id", validateaction, (req, res) => {
    const {description, notes} = req.body;
    if (!description || !notes) {
        res.status(400).json({Denied: `You must provide a description and notes`})
    } else (
        actions.update(req.action, req.body)
            .then(action => {
                res.status(200).json(action)
            })
            .catch(() => {
                res.status(500).json({Error: 'there was an error updateing the actions'})
            })
    )
})

//check and see if the project exists
function validatePost(req, res, next) {
    project.get(req.params.id)
        .then(got => {
            if (!got) {
                res.status(400).json({Error: "there is no project with that id"})
            } else {
                req.project = req.params.id
                next()
            }
        })
}

function validateaction(req, res, next) {
    actions.get(req.params.id)
        .then(got => {
            if (!got) {
                res.status(400).json({Error: "there is no actions with that id"})
            } else {
                req.body.project_id = got.project_id
                req.action = req.params.id
                next()
            }
        })
}


 module.exports = router