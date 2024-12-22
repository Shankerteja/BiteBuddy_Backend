const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
const {Vendor}=require('../models/Vendor');

dotenv.config();
const secretKey=process.env.SECRET_KEY
const VendorRegister=async(request,response)=>{

    const {username,email,password}=request.body;

    try{
        const emailExist=await Vendor.findOne({email});

        if(emailExist){
          return response.status(400).json({message:'Email already Exits'})
        }else{
            const hashedPassword=await bcrypt.hash(password,10);
            const newVendor=new Vendor({
                username,
                email,
                password:hashedPassword
            })
            await newVendor.save();
            response.status(201).json({message:'Vendor Registered Successfully'})
        }
        
    }catch(error){
        console.log(error)
        response.status(500).json({error:'Internal Server Error'})
    }

}


const venderLogin=async(request,response)=>{
    const {email,password}=request.body;

    try{
        const emailExist=await Vendor.findOne({email});
    if(!emailExist){
        return response.status(400).json({message:"User Not Registered"});
    }
    const passwordMatch=await bcrypt.compare(password,emailExist.password);
    if(!passwordMatch){
        return response.status(400).json({message:'Invalid Password'})
    }
    const token=jwt.sign({vendorId:emailExist._id},secretKey,{expiresIn:'1h'});
    response.status(200).json({message:"Login SuccessFully",token});
    }
    catch(error){
        response.status(501).json({error:'Internal Server Error'});
        console.log(error)

        
    }
    
}


const getAllVendors=async (request,response)=>{
    try {
        const vendors= await Vendor.find().populate('firm');
     
        response.status(200).json({vendors});
        
    } catch (error) {
        console.log(error)
        response.status(500).json({error:"Internal Server Error"})
        
    }


}

const getSingleVendor=async (request,response)=>{
    const vendor=request.params.id;
    try {
        const vendorDetails=await Vendor.findById(vendor).populate('firm')
    if(!vendorDetails){
       return response.status(404).json({error:"Vendor Not Found"})
    }

    response.status(200).json({vendor:vendorDetails});
    } catch (error) {
    response.status(500).json({error:"Internal Server Error"})
        
    }
}

module.exports={VendorRegister,venderLogin,getAllVendors,getSingleVendor};