const { ObjectId } = require('bson');
const mongoose = require('mongoose');

function updateTimeStamp () {
    return this.createdAt = Date.now;
}

const reactionSchema = mongoose.Schema({
    reactionId : {
        type: mongoose.SchemaTypes.ObjectId,
        default: new ObjectId
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
        get: updateTimeStamp

    },
})

module.exports = reactionSchema;
