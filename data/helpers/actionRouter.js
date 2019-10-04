const express = require('express');
const action = require('../data/helpers/actionModel');

const router = express.Router();

router.get('/', (req, res) => {
  action.get()
    .then(actions => {
      res.status(200).json(actions)
    })
    .error(err => {
      console.log(err)
      res.status(500).json({ error: "Error getting actions." })
    })
});

router.post('/', (req, res) => {
  const actions = req.body;
  action.insert(actions)
    .then(actions => {
      res.status(201).json(actions);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Error inserting actions.' })
    })
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  action.remove(id)
    .then(() => {
      res.status(204).end()
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Error deleting actions.' })
    })
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { project_id, description, notes, completed } = req.body;

  action.update(id, { project_id, description, notes, completed })
    .then(updated => {
      res.status(200).json(updated);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Error updating actions.' })
    })
})

//check and see if the project exists



 module.exports = router