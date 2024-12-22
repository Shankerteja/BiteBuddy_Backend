const mongoose=require("mongoose");

const ProductSchema=new mongoose.Schema({
    productName:{
        type:String,
        required:true,
 
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
    },
    image:{
        type:String,
    },
    category:{
        type:[
            {
                type:String,
            enum:['veg','non-veg']
            }
        ]
    },
    bestSeller:{
        type:String

    },
    firm:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Firm'
    }
})

const Product=mongoose.model('Product',ProductSchema)

module.exports={Product}