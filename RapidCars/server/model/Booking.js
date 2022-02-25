const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let bookingSchema = new Schema({
    fromlocation:{
       type: String,
       required: true
    },
    tolocation:{
      type: String,
      required: true
   },
    car_db:{
        type: String,
       required: true
    },
    car_id:{
        type: String,
       required: true
    },
    user_db:{
        type: String,
       required: true
    },
    user_id:{
        type: String,
       required: true
    },
    fromdate:{
      type: Date,
      required: true
   },
   todate:{
      type: Date,
      required: true
   },
   BillAmount:{
      type: Number,
      required: true
   },
   IsRuning:{
      type: Boolean,
      required: true
   },
   Hours:{
      type: String,
      required: true
   },

 },{
    timestamps: true,
    collection: 'booking'
 })
 
 module.exports = mongoose.model('booking', bookingSchema);