const dotenv=require('dotenv');
const jwt=require("jsonwebtoken");
const {Vendor}=require('../models/Vendor');

dotenv.config()

const secretKey=process.env.SECRET_KEY


const verifyUser=async (request,response,next)=>{
    const authHeader=request.headers['authorization'];
    let jwtToken;
    if(authHeader!==undefined){
        jwtToken=authHeader.split(' ')[1];
    }
    if(!jwtToken){
       return response.status(401).json({message:"Invalid Access Token"})
    }

        jwt.verify(jwtToken,secretKey,(error,payload)=>{
            if(error){
                response.status(401).json({error:"Invalid Access Token"})
            }else{
                request.vendorId=payload.vendorId;
                console.log(payload.vendorId)
                console.log(payload)
            next()
            }
        });
      
}

module.exports=verifyUser