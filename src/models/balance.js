const mongoose = require('mongoose');

const balanceSchema = mongoose.Schema({
    balance: {
        type: Number,
        required: true,
        default: 0.00
    },
      lastUpdated: {
        type: Date,
        default: Date.now
    }
})

const Balance = mongoose.model('Balance', balanceSchema);

module.exports = Balance;