
const {firmModel}=require('../models/Firm')
const {Product}=require('../models/product')
const multer=require("multer");
const path=require("path")
 
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'uploads/'); // Destination folder where the uploaded images will be stored
  },
  filename: function(req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Generating a unique filename
  }
});

const upload = multer({ storage: storage });
const addProduct=async (request,response)=>{
   try {
    const {productName,price,description,category,bestSeller}=request.body
    const image = request.file ? request.file.filename : undefined;

    const firmId=request.params.id;

    const firm=await firmModel.findById(firmId);

    if(!firm){
      return response.status(404).json({error:"Firm Not Found"})
    }

    const product=new Product({
        productName,price,category,image,bestSeller,description,firm:firm._id
    })

    const savedProduct=await product.save()
    firm.products.push(savedProduct);
    await firm.save();
    response.status(201).json({message:"Product Added SuccessFully"})

   } catch (error) {
    console.error(error)
    response.status(500).json({errr:"Internal Server Error"})
    
   }
}

const getProductByFirm=async (request,response)=>{
    try {
        const firmId=request.params.id;
        const firm=await firmModel.findById(firmId)
        const firmName=firm.firmName;
        if(!firm){
            return response.status(404).json({error:"Firm Not Found"})
        }
        const products=await Product.find({firm:firmId})
        response.status(200).json({firmname:firmName,products})
    } catch (error) {
        console.error(error)
        response.status(500).json({error:"Internal Server Error"})
        
    }
}

const deleteProduct=async(request,response)=>{
    try {
        const productId=request.params.id;
        const product=await Product.findByIdAndDelete(productId);
        if(!product){
           return response.status(404).json({error:"Product Not Found"})
        }
        response.status(201).json({message:"Product Deleted SuccessFully"})
    } catch (error) {
        response.status(500).json({error:"Internal Server Error"})
        
    }

}

module.exports={addProduct:[upload.single('image'),addProduct],getProductByFirm,deleteProduct}