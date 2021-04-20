const express=require('express');

const mongoose=require('mongoose')
const ProductDb=require('../models/product')
const orderDb=require('../models/Orderdb');
const auth=require('../middleware/auth-token');
const routes=express.Router();

routes.get('/',function(req,res,next){
    orderDb.find().select('product quantity _id').populate('product','name').exec().then(details=>{
      
       res.status(200).json({
           count:details.length,
           order:details
       });
    }).catch(err=>{
        res.status(500).json({error:err});
    })
});

routes.post('/',auth,function(req,res,next){
        const product_id=req.body.product;
        let OrderDetails=new orderDb();
        
    
        ProductDb.findById(product_id).exec().then(ex=>{
        
            console.log("PID => " , ex);
            OrderDetails=new orderDb({
                _id:new mongoose.Types.ObjectId(),
                quantity:req.body.quantity,
                product:product_id
        
            });
            OrderDetails.save().then(doc=>{
                console.log(ex);
                res.status(200).json({
                    message:'Order has been created',
                    orderId:doc._id,
                    productId:doc.product,
                    quantity:doc.quantity,
                    request:{
                        type:"GET",
                        link:"http://localhost:3000/order/"+doc._id
                    }
                });
            }).catch(err=>{
                res.status(500).json({error:err});
            })
            
        }).catch(err => {
            console.log(`Error whilw creating order with error ${err}`);
            res.status(400).json({
                message: "invalid product information"
            })
        })
   
});
routes.get('/:orderId',function(req,res,next){
    
    const _orderId=req.params.orderId;
    orderDb.findById(_orderId).populate('product').exec().then(result=>{

        res.status(200).json({
            OrderDetaisl:{
                message:"Below is the Order Details",
                orderId:result._id,
                productId:result.product,
                quantity:result.quantity
            }
        });
    }).catch(err=>{
        res.status(500).json({error:err});
    })
});
routes.patch('/:orderId',auth,function(req,res,next){
    const id=req.params.orderId;
    const updateOps={};
    for(const op of req.body){
        updateOps[op.propName]=op.value;
    }
     orderDb.update({_id:id},{$set:updateOps}).exec().then(doc=>{
         console.log(doc);
         res.status(200).json({doc});
     }).catch(err=>{
         res.status(500).json({error:err});
     })
});
routes.delete('/:orderId',auth,function(req,res,next){
    const id=req.params.orderId;
   orderDb.remove({_id:id}).exec().then(result=>{
          orderDb.find().then(ods =>{
                res.status(200).json({
                    orders: ods
                });
          }).
          catch(err => {
            res.status(500).json({
                message: "something went wrong"
            })
          })  
   }).catch(err=>{
       res.status(500).json({error:err});
   }
       
   )
});


module.exports=routes;

