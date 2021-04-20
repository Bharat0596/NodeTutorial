const express = require('express');
const {uuid} = require('uuidv4')
const routes = express.Router();
const productdb=require('../models/product')
const mongoose=require('mongoose')
const multer=require('multer')
const auth=require('../middleware/auth-token')

const storage=multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./upload/');
    },
    filename : function(req,file,cb){
        cb(null,  file.originalname  );
    }

})
const fileFilter=(req,file,cb)=>{
    if(file.mimetype==='image/jpeg'  || file.mimetype==='image/png'){
        cb(null,true);
    }else{
        cb(null,false);
      // res.status(200).json("file should be in jpeg/jpg/png only")
    }
    
}
const upload=multer(
    {
        storage:storage,
        limits:{
            fileSize:1024*1024*5
         },
        fileFilter:fileFilter
});

routes.get('/',function(req,res,next){
   
    
   productdb
    .find().select('name price _id productImage')
    .exec()
    .then(doc=>{
        response={
            count:doc.length,
            products:doc.map(doc=>{
               return{
                name:doc.name,
                _id : doc._id,
                price:doc.price,
                productImage:doc.productImage,
                request:{
                    type:"GET",
                    link:"http://localhost:3000/products/"+ doc._id
                }
               }

            })
        }
        res.status(200).json(response)
    })
    .catch(err=>{
        res.status(500).json({error: err});
    })

});
routes.post('/',upload.single('productImage'),auth,function(req,res,next){
   console.log(req.file);
    const productDetails=new productdb({
        _id:new mongoose.Types.ObjectId(),
        name :req.body.name,
        price:req.body.price,
        productImage:req.file.path
    });
    productDetails.save().then(result =>{
        
        return res.status(200).json({
            message :'Created Message Successfully',
            createProduct: {
                name:result.name,
                _id:result._id,
                price:result.price,
                request:{
                    type:"GET",
                    link:"http://localhost:3000/products/"+ result._id
                }
            }
        })
        
    }).catch( (err ) =>{
        console.log("error in product creation => " + err);
         return  res.status(500).json({
             error:err,
            message :'failed to create object in DB'
        });
     });
    
});

routes.get('/:productId',function(req,res,next){
    const id=req.params.productId;
   // const pd=createProduct.id
   console.log("hello fetching from mondo database");
    productdb.findById(id).select('name price _id productImage').exec(console.log("executing")).then(doc=>{

        console.log("The value of documents =>"+doc);
        if(doc){
        res.status(200).json({doc});
        }else{
            res.status(404).json({message :"No Record Found"});
        }
    }).catch(err=>{
        console.log(err);
        res.status(500).json({error:err});
    })
});

routes.patch('/:productId',auth,function(req,res){
   const id=req.params.productId;
   const updateOps={};
   for(const op of req.body){
       updateOps[op.propName]=op.value;
   }
    productdb.update({_id:id},{$set:updateOps}).exec().then(doc=>{
        console.log(doc);
        res.status(200).json({doc});
    }).catch(err=>{
        res.status(500).json({error:err});
    })
})

routes.delete('/:productId',auth,function(req,res){
    const id=req.params.productId;
   productdb.remove({_id:id}).exec().then(result=>{
       res.status(200).json(result);
   }).catch(err=>{
       console.log(err);
       res.status(500).json({error:err});
   })
})

module.exports=routes;