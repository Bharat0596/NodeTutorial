const mongoose=require('mongoose');

const productSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:{type:String,required:true},
    price:{ type : Number,required:true},
    sales:Number,
    productImage:{type:String,required:true}
})

module.exports=mongoose.model('productSchema',productSchema);