const mongoose = require('mongoose');
const thought = require('./Thought')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    thoughts: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Thought"
    },
    friends: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "User"
    },
},
{
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
    id: false
})

userSchema.virtual('friendCount').get (function () {
    return this.friends.length
})

userSchema.pre('remove', function (next) {
    console.log("Pre test. the thoughts are removed")
    const thoughts = mongoose.model('Thought')
    thoughts.remove({username: this.username})
    next()
})

module.exports = mongoose.model('User', userSchema);

