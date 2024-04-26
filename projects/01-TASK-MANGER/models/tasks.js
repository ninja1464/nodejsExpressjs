const mongoose = require('mongoose')

const Taskschema =  new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'must provide a name'],
        trim: true,
        maxlength:[20,'string length can only be 20 charcters ']        
    },
    completed: {
        type: Boolean,
        default:false,
    },
})


module.exports = mongoose.model('Task', Taskschema)