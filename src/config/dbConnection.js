const mongoose = require('mongoose');

require('dotenv').config()

dbConnect = async () => {
    await mongoose.connect(process.env.DB_URI)
    if (dbConnect) {
        console.log('Connected');
    }
    else{
        console.log('Not connected');
        
    }
}
module.exports = dbConnect