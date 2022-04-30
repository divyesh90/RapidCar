const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let carSchema = new Schema({
   cname: {
      type: String,
      required: true
   },
   location: {
      type: String,
      required: true
   },
   carno: {
      type: String,
      required: true
   },
   cartype: {
      type: String,
      required: true
   },
   fuel: {
      type: String,
      required: true
   },
   mileage:{
      type:Number,
      required: true

   },
   gear_type: {
      type: String,
      required: true
   },
   company: {
      type: String,
      required: true
   },
   seat: {
      type: Number,
      required: true
   },
   cpurchase: {
      type: Date,
      required: true
   },
   cprice: {
      type: Number,
      required: true
   },
   cimage: {
      type: String,
      required: true
   },
   IsBook: {
      type: Boolean,
      required: true,
      default:false,
   }
}, {
   timestamps: true,
   collection: 'cars'
})

module.exports = mongoose.model('Car', carSchema);