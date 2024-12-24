const express=require("express")
const router=express.Router()
const userVerify=require("../middleWares/userVerify")
const path=require('path')
const productController=require('../controllers/productController')
router.post('/add-product/:id',userVerify,productController.addProduct)
router.get('/:id/products',userVerify,productController.getProductByFirm)
router.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.header('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
});

router.delete('/:id',userVerify,productController.deleteProduct)
module.exports=router;



