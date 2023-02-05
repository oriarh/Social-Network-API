const router = require('express').Router();
const { error } = require('console');
const Thought = require('../../models/Thought')
const User = require('../../models/User')

router.get('/', async (req, res) => {
  try {
    const allthoughts = await Thought.find()
    res.json(allthoughts)
  } catch {
    console.log(error)
    res.status(500)
  }
  });
  
router.get('/:id', async (req, res) => {
  try {
      const allthoughts = await Thought.findOne( {
        _id: req.params.id
      });
      res.json(allthoughts)
   } catch {
      console.log(error)
      res.status(500)
   }
  });
  
router.post('/', async (req, res) => {
  try {
    const newthought = new Thought({
      thoughtText: req.body.thoughtText,
      username: req.body.username,
  })
    newthought.save()
    console.log(newthought)
    addThoughtToUser(req.body.userId,newthought._id)
    res.status(200).json(newthought);
  } catch {
    res.status(500).json({message: "There was a problem bro"})
  }
  });
  
router.put('/:id', async (req, res) => {
  try {
    const updatedthought = await Thought.findOneAndUpdate(
      { _id: req.params.id },
      {
        thoughtname: req.body.thoughtname,
        email:req.body.email,
      },
      { new: true },
      )
    res.status(200).json(updatedthought);
    console.log(`Updated: ${updatedthought}`);
 } catch {
    console.log('Uh Oh, something went wrong');
    res.status(500).json({ message: 'something went wrong' });
 }
});
  
router.delete('/:id', async (req, res) => {
  try {
    const deletedthought = await Thought.findOneAndDelete(
      { _id: req.params.id })
      res.status(200).json("thought has been removed")
      console.log(`Deleted: ${deletedthought}`)
    } catch {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ message: 'something went wrong' });
    }
});

// To create a reaction stored in a single thought's reactions array field
router.post('/:thoughtId/reactions', async (req, res) => {
  try {
    const reaction = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      {
       $push: { reactions: 
          {
            reactionBody: req.body.reactionBody,
            username: req.body.username
          } 
       }
      },
      { new: true },
      )
    res.status(200).json(reaction);
    console.log(`Updated: ${reaction}`);
 } catch {
    console.log('Uh Oh, something went wrong');
    res.status(500).json({ message: 'something went wrong' });
 }
});

// To delete a new friend from the thought's friend list
// router.delete('/:thoughtId/reactions', async (req, res) => {
//   try {
//     const thought = await Thought.findOne({_id: req.params.id})

//     const deletedthought = await Thought.findOneAndDelete(
//       { friends: req.params.friendId })
//       res.status(200).json("thought has been removed")
//       console.log(`Deleted: ${deletedthought}`)
//     } catch {
//       console.log('Uh Oh, something went wrong');
//       res.status(500).json({ message: 'something went wrong' });
//     }
// });

router.put('/:thoughtId/reactions/:reactionId', async (req, res) => {
  try {
    const deletedReaction = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      {
       $pull: { reactions: { reactionId: req.params.reactionId } }
      },
      { new: true },
      )
      res.status(200).json(deletedReaction)
      console.log(`Deleted: ${deletedReaction}`)
    } catch {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ message: 'something went wrong' });
    }
});

async function addThoughtToUser (userId,theThought) {

  const updatedUser = await User.findOneAndUpdate(
    { _id: userId },
    {
    $push: { thoughts: theThought }
    }
    )
  }

module.exports = router;
  