var fs=require('fs');
var http=require('http')

http.createServer(function(req,res){
    fs.readFile('C:/Users/bhara/OneDrive/Desktop/postman/readFile.html',function(err,data){

        res.writeHead(200,{'Content-Type':'text/html'});
        res.write(data);
        res.end();
    });

}).listen(8080)