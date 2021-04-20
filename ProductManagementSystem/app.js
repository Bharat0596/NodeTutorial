const express=require('express');
const app=express();
const productRoutes=require('./api/routes/products');
const orderRoutes=require('./api/routes/order');
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const morgan=require('morgan')
const userRoutes=require('./api/routes/user');


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



mongoose.connect('mongodb+srv://bharat0596:bharat123@ordermanagementsystem.aljvz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
  // useMongoClient:true,
    //message:"The database has been connected"
})


mongoose.Promise=global.Promise;

app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin" ,"*");

    res.header("Access-Control-Allow-Headers","Origins","X-Requested-With","Content-Type","Accept","Authorization");
    if(req.method=='OPTIONS'){
        res.header("Access=Control-Allow-Method","PUT","PATCH","POST","DELETE","GET");
        res.status(200).json({});
    }
    next();

});

app.use('/upload',express.static('upload'));
//ROuites whihc should handle request
app.use('/products',productRoutes);
app.use('/order',orderRoutes);
app.use('/user',userRoutes);

app.use((req,res,next)=>{
      const error=new Error('Method not found');
      error.status=404;
      next(error);
})

app.use((error,req,res,next) => {

    res.status(error.status ||  500);
    res.json({
         
        error:{
            message :error.message
        }
       
    });
});

module.exports=app;