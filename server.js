const express=require('express');
const dotenv=require('dotenv');
const mongoose=require('mongoose');
const bodyParser=require('body-parser')
const vendorRoutes=require('./routes/vendorRoutes')
const firmRoutes=require('./routes/firmRoutes')
const productRoutes=require('./routes/productRoutes')
const path=require("path")
const app=express();
dotenv.config();

const PORT=process.env.PORT || 3000;

const initialiseDB=async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log('MongoDB Connected')

    }
    catch(error){
        console.error(error)
    }

}
app.use(bodyParser.json())
app.use('/vendor',vendorRoutes);
app.use('/firm',firmRoutes)
app.use('/product',productRoutes)
app.use('/uploads',express.static('uploads'))
initialiseDB()

app.listen(PORT,()=>{
    console.log(`Server is Running at ${PORT}`)
})

app.use('/',(req,res)=>{
    res.send("<h1>Hi Shanker teja<h1/>")
});



