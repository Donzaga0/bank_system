const mongoose = require('mongoose');

const transcationSchema = mongoose.Schema({
    description:{
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    type:{
        type: String,
        required: true,
        enum: ['debit', 'credit', 'check', 'transfer', 'deposit', 'withdrawal']
    },
    status:{
        type: String,
        required: true,
        enum: ['pending', 'completed', 'failed', 'cancelled', 'processing', 'refunded']
    },
    balance:{
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Transcation = mongoose.model('Transcation', transcationSchema);

module.exports = Transcation;