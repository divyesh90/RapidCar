const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

//console.log(process.env.DATABASE);
console.log("hello");
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
 .then(() => console.log('DB Connected'));
