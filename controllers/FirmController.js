const multer=require('multer');
const {firmModel}=require('../models/Firm');
const {Vendor}=require('../models/Vendor')

    // Configure storage
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, 'uploads/'); // Directory to save images
        },
        filename: (req, file, cb) => {
          cb(null, Date.now()+path.extname(file.originalname)); // Unique file name
        },
      });
      // Initialize multer
    const upload = multer({
        storage: storage
      });



const addFirm=async(request,response)=>{
    const {firmName,area,category,region,offer}=request.body;

    const image=request.file ? request.file.filename : undefined
  

    const vendor =await Vendor.findById(request.vendorId)
   
    if(!vendor){
        response.status(404).json("Vendor NotFound")
    }

    try {
        const firm=new firmModel({
            firmName,area,category,region,offer,image,vendor:vendor._id
        })
 
    
       const savedFirm= await firm.save();
       vendor.firm.push(savedFirm);
       await vendor.save();
       return response.status(201).json({messege:"Firm Added SuccessFully"})
    } catch (error) {
   
        response.status(500).json({error:error})

        
    }
}


const getAllProductsByFirmId=async (request,response)=>{
  const firmId=request.params.id;
 try {
  const firm=await firmModel.findById(firmId).populate('products');
  if(!firm){
   return response.status(404).json({error:"Firm Not Found"})
  }
  response.status(200).json({firm})

 } catch (error) {
  console.error(error)
  response.status(500).json({error:"Internal Server Error"})
  
 }


}



module.exports={addFirm:[upload.single('image'),addFirm],getAllProductsByFirmId}