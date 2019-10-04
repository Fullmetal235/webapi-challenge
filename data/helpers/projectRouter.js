const express = require('express')

const project = require('./projectModel.js')

const router = express.Router()
//get all project
router.get('/projects', (req, res) => {
    project.get()
    .then(result => {
        res.status(200).json(result)
    })
    .catch(error => {
        res.status(500).json({error: "The projects information could not be retrieved."})
    })
})

//get project actions
router.get('/projects/:id', validatePost, (req, res) => {
    const {id} = req.params
    project.getProjectActions(id)
    .then(results => {
        res.status(200).json(results)
    })
    .catch(error => {
        res.status(500).json({error: "The projects information could not be retrieved."})
    })
})
//post a project
router.post('/projects', (req, res) => {
    const {name, description} = req.body
    if (!name || !description) {
        res.status(400).json({Error: 'You must provide both a name and description'})
    } else {
        project.insert(req.body)
            .then(post => {
                res.status(201).json(post)
            })
            .catch(() => {
                res.status(500).json({Error: 'there was an error adding the post to the database'})
            })
    }
})
//delete a project
router.delete("/projects/:id", (req, res) => {
    const {id} = req.params
    project.remove(id)
    .then(result => {
        res.status(200).json({message: 'project deleted succesfully'})
    })
    .catch(error => {
        res.status(500).json({error: "The projects information could not be removed."})
    })
})

//edit a project
server.put("/projects/:id", validatePost, (req,res) => {
    const {name, description} = req.body
    if (!name || !description) {
        res.status(400).json({Error: 'You must provide both a name and description'})
    } else {
        pdb.update(req.project, req.body)
            .then(post => {
                res.status(200).json(post)
            })
            .catch(() => {
                res.status(500).json({Error: 'there was an error updateing the post in the projectbase'})
            })
    }
})
//check and see if the project exists
function validatePost(req, res, next) {
    pdb.get(req.params.id)
        .then(got => {
            if (!got) {
                res.status(400).json({Error: "there is no project with that id"})
            } else {
                req.project = req.params.id
                next()
            }
        })
}
module.exports = router