const { error } = require('console');
const { read } = require('fs');
const router = require('express').Router();
const User = require('../../models/User')

router.get('/', async (req, res) => {
  try {
    const allUsers = await User.find()
    //.populate('friends');
    //.populate('thoughts');
    res.json(allUsers)
  } catch {
    console.log(error)
    res.status(500)
  }
  });
  
router.get('/:id', async (req, res) => {
  try {
      const allUsers = await User.findOne( {
        _id: req.params.id
      });
      res.json(allUsers)
   } catch {
      console.log(error)
      res.status(500)
   }
  });
  
router.post('/', async (req, res) => {
  try {
    const newUser = new User({
    username: req.body.username,
    email: req.body.email
  })
    newUser.save()
    res.status(200).json(newUser)
  }
  catch {
    console.log(error);
    res.status(500).json({message: "There was a problem bro"})
  }
  });
  
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        username: req.body.username,
        email:req.body.email
      },
      { new: true },
      )
    res.status(200).json(updatedUser);
    console.log(`Updated: ${updatedUser}`);
 } catch {
    console.log('Uh Oh, something went wrong');
    res.status(500).json({ message: 'something went wrong' });
 }
});
  
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete(
      { _id: req.params.id })
      res.status(200).json("User has been removed")
      console.log(`Deleted: ${deletedUser}`)
    } catch {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ message: 'something went wrong' });
    }
});

// To add a new friend to the user's friend list
router.put('/:id/friends/:friendId', async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
       $push: { friends: req.params.friendId }
      },
      { new: true },
      )
    res.status(200).json(updatedUser);
    console.log(`Updated: ${updatedUser}`);
 } catch {
    console.log('Uh Oh, something went wrong');
    res.status(500).json({ message: 'something went wrong' });
 }
});

// To delete a new friend from the user's friend list
router.delete('/:id/friends/:friendId', async (req, res) => {
  try {
    const user = await User.findOne({_id: req.params.id})

    const deletedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
       $pull: { friends: req.params.friendId }
      },
      { new: true },
      )
      res.status(200).json("User has been removed")
      console.log(`Deleted: ${deletedUser}`)
    } catch {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ message: 'something went wrong' });
    }
});
  
module.exports = router;
  