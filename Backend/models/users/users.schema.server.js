const mongoose = require('mongoose');

 const  userSchema = mongoose.Schema({

    first: String,
    last: String,
    email: String,
    password: String, 
    type: {type: String, enum: ['USER', 'AGENT', 'ADMIN']},
    ticketsBooked: {type: Array, default: []},
    created: {type: Date, default: Date.now},
    feedback: [String]
    

})

module.exports = userSchema;