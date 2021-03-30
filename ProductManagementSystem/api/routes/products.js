const express = require('express');
const {uuid} = require('uuidv4')
const routes = express.Router();

routes.get('/',function(req,res,next){
    const id = uuid();
     res.status(200).json({
         message :'its products routes handling get method',
         id :id
     })

});
routes.post('/',function(req,res,next){
    res.status(200).json({
        message :'its products routes handling post methods'
    })

});
routes.get('/:productId',function(req,res,next){
    const id=req.params.productId;
    if(id=='special'){
        res.status(200).json({
            
            message :'its a special products'
        });
    }else{
        res.status(200).json({
            message :'Product ID Passed'
        })
    }
});

routes.patch('/:productId',function(req,res){
    res.status(200).json({
        message :'Updated Products'
    });
})

routes.delete('/:productId',function(req,res){
    res.status(200).json({
        message :'Delted Product with the id'
    });
})

module.exports=routes;