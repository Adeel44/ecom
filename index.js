const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose');

const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');


dotenv.config()


mongoose.connect(process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (error , clint)=>{
      if(error){
     return console.log("Unable  to conect to db")
      }
      console.log("BD conect")

})




app.use(express.json())

// //Route middlewae
 app.use('/api/user' , authRoute)
 app.use('/api/posts', postRoute)

 app.use('/product', productRoutes);

 app.use('/orders', orderRoutes);


//app.get('/', (req, res) => res.send('Hello World! node'))

app.listen(3000, () => console.log('Server is running on 3000'))

