require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')
const app = express()

app.use(express.json())

const adminRoute = require('./src/routes/adminRoute');
const authRoute = require('./src/routes/authRoute');    
const userRoute = require('./src/routes/userRoute')
const dbConnect = require('./src/config/dbConnection'); 

const port = process.env.APP_PORT

app.use(express.json()); // for application/json
app.use(express.urlencoded({ extended: true })); 

app.use(cookieParser())

app.set('view engine', 'ejs') 
 
app.use('/admin', adminRoute);
app.use('/auth', authRoute);
app.use('/user', userRoute);

dbConnect().then() 
.catch(e => console.log(e))            

app.use(express.static(path.join(__dirname, '/public')))


// app.use((req, res, next) => {
//   res.status(404).render('./404'); 
// });

app.listen(port, () => {
  console.log(`Server started  successfully ${port}`) 
})