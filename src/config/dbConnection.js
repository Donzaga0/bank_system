// const mongoose = require('mongoose');

// require('dotenv').config()

// dbConnect = async () => {
//     await mongoose.connect(process.env.DB_URI)
//     if (dbConnect) {
//         console.log('Connected');
//     }
//     else{
//         console.log('Not connected');
        
//     }
// }
// module.exports = dbConnect

const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = async () => {   
  try {
    await mongoose.connect(process.env.DB_URI, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    });
    console.log('MongoDB Atlas connected '); 
  } catch (error) {
    console.error(' MongoDB Atlas connection failed:', error.message);
    process.exit(1); // Exit the process if DB connection fails
  }
};

 module.exports = dbConnect;