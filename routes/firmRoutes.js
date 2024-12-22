const express=require('express')
const router=express.Router();
const firmController=require('../controllers/FirmController');
const verifyUser=require('../middleWares/userVerify')
const path=require('path')

router.post('/add-firm',verifyUser,firmController.addFirm)
router.get('/:id/products',verifyUser,firmController.getAllProductsByFirmId)
router.get('/uploads/:imageName',(request,response)=>{
    const imageName=request.params.imageName;
    response.headersSent("Content-Type","image/jpeg");
    response.sendFile(path.join(__dirname,"..","uploads",imageName))
})
module.exports=router;