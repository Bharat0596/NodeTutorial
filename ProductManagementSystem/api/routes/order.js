const express=require('express');



const routes=express.Router();

routes.get('/',function(req,res,next){
    res.status(200).json({
        message:'handling order object Get method'
    });
});

routes.post('/',function(req,res,next){
    res.status(200).json({
        message:'Order Post Method'
    });

});
routes.get('/:orderId',function(req,res,next){
    const id=req.params.orderId
    res.status(200).json({
        message :'get Order By ID',
       id = id
    });
});
routes.patch('/:orderId',function(req,res,next){
    res.status(200).json({
        message :'order updated'
        
    });
});
routes.delete('/:orderId',function(req,res,next){
    res.status(200).json({
        message :'order Deleted'
    });
});


module.exports=routes;

