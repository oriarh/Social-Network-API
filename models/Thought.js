const mongoose = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new mongoose.Schema({
    thoughtText: {
        type: String,
        required: true,
        maxLength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now

    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema]
},
{
    toJSON: {
        getters: true
    },
    toObject: {
        getters:true,
    },
    id: false
})

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
})

module.exports = mongoose.model('Thought', thoughtSchema);
