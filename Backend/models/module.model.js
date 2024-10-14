const mongoose = require('mongoose');

const ModuleSchema = mongoose.Schema(
    {
            module:{
                type: String,
                required: true
            },
            semester:{
                type: Number,
                required: true
            },
            year_level: {
                type: Number,
                required: true
              
            },
            lecturer_id: {
                type: mongoose.Schema.Types.String,
                ref: 'User',
                required: true
            },
            description:{
                type: String,
                required: true
            }
    }

);

const Module = mongoose.model('Module', ModuleSchema);

module.exports = Module;