const mongoose=require('mongoose');
//const productSchema=require('../models/product');

const OrderSchema=mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    product:{ type:mongoose.Schema.Types.ObjectId, ref :'productSchema',required:true},
    quantity:{type:Number,default:1}

})
module.exports=mongoose.model('OrderSchema',OrderSchema);