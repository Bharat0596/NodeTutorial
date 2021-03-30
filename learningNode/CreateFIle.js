var fs=require('fs')
var http=require('http')
var con=require('./writeContents')

http.createServer(function(req,res){

   // if(fs.existsSync('C:/Users/bhara/OneDrive/Desktop/postman/readFile.txt')){
      //  fs.unlink('C:/Users/bhara/OneDrive/Desktop/postman/readFile.txt',function(err){
        //    if(err) {
          //      throw err}
            //    else{
              //      console.log('file deleted')
                //}
      //  });
    //}
    fs.writeFile('C:/Users/bhara/OneDrive/Desktop/postman/readFile.txt',con.fileContents(),function(err){
       if(err){
           throw err;
       }else{
           console.log('success')
       }
    });

    fs.unlink('C:/Users/bhara/OneDrive/Desktop/postman/readFile.txt',function(err){
        if(err) {
            throw err}
            else{
                console.log('file deleted')
            }
    });
}).listen(8080)