const mongoose = require('mongoose')

const Schema = mongoose.Schema

const applicationSchema = new Schema({
    comp: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Ongoing',
            'Rejected',
            'Declined',
            'Expired'],
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Application', applicationSchema)

// Application.find