const router = require('express').Router();
const { User, Thought } = require('../models')

router.get('/', async (req, res) => {
   const allUsers = await User.find();
   res.json(allUsers)
  });
  
router.get('/:id', async (req, res) => {

  });
  
router.post('/', async (req, res) => {

  });
  
router.put('/:id', async (req, res) => {

  });
  
router.delete('/:id', async (req, res) => {

  })
  
  module.exports = router;
  