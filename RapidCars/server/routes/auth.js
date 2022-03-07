const express = require('express');
const router = express.Router();
const multer=require('multer');
const path= require('path');
const  fs = require('fs');
const { signup, signin , carregister,cardata , booking, bookingdata , canclebooking,BookingComplete,system_bookingdata,removecar,sendotp,cmpotp , resetpass} = require('../Controler/auth');


var Storage = multer.diskStorage({
    destination:"./public/uploads/",
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now()+ path.extname(file.originalname));
        console.log(" in filename ")
    }
});
var upload = multer({
    storage: Storage
    }).single('file');
    
router.post('/signup', signup);
router.post('/signin', signin);
router.post('/carregister',upload, carregister);
router.post('/booking', booking);
router.delete('/canclebooking/:id', canclebooking);
router.delete('/removecar/:id', removecar);
router.post('/bookingdata', bookingdata)
router.post('/systembookingdata', system_bookingdata)
router.get('/cars', cardata );
router.put('/bookingcomplete/:id', BookingComplete );
router.post('/sendotp', sendotp);
router.post('/cmpotp', cmpotp);
router.post('/resetpass', resetpass);
module.exports = router;