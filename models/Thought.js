const mongoose = require('mongoose');
import reactionSchema from './Reaction';

function updateTimeStamp () {
    return this.createdAt = Date.now;
}

const thoughtSchema = mongoose.Schema({
    thoughtText: {
        type: String,
        required: true,
        maxLength: 280,
    },
    createdAt: {
        type: String,
        get: updateTimeStamp

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
    }
})

thoughtSchema.virtual('reactionCount', function() {
    return this.reactions.length

})

module.exports = mongoose.model('Thought', thoughtSchema);
