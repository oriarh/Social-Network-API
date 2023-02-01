const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
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
    }
})

userSchema.virtual('friendCount', function(name) {
    return this.friens.length
})

module.exports = mongoose.model('User', userSchema);

