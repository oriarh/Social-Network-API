const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/socialNetworkdb', {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    }, () => {
        console.log('connected')
})

module.exports = mongoose.connection;