const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// db
mongoose
 .connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
 .then(() => console.log('DB Connected'));
