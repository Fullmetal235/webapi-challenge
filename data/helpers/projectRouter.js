const express = require('express');
const project = require('./projectModel.js');

const router = express.Router();

router.get('/', (req, res) => {
  project.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Error getting projects.' });
    })
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  project.getProjectActions(id)
    .then(projects => {
      if (projects) {
        res.status(200).json(projects)
      } else {
        res.status(404).json({ error: 'Projects with id does not match.' })
      }
    })
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  project.update(id, { name, description })
    .then(updated => {
      res.status(201).json(updated);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Error updatig project.' })
    })
})

router.post('/', validatePost, (req, res) => {
  const project = req.body;
  project.insert(project)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Error inserting project.' })
    })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  project.remove(id)
    .then(() => {
      res.status(204).end()
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Error deleting projects.' })
    })
});


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
module.exports = router