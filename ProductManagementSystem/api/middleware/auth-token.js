const jwt=require('jsonwebtoken');

module.exports= (req,res,next) => {
   try{
    const decode= jwt.verify(req.body.token,"secret");
    req.userData=decode;
    next();
   }catch (error) {
       res.status(403).json({
           errMsg: "invalid credential"
       });
   }

   
}