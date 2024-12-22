const express=require('express');
const router=express.Router()
const vendorController=require('../controllers/VendorControllers')

router.post('/register',vendorController.VendorRegister);
router.post('/login',vendorController.venderLogin);
router.get('/vendorsList',vendorController.getAllVendors)
router.get('/vendor/:id',vendorController.getSingleVendor);

module.exports=router;