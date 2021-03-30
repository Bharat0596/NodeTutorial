var http=require('http');

http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'html/text'});
    res.end('Hello WOlrd');
}).listen(8080)