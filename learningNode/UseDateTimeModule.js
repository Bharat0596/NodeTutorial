var http=require('http');
var dt = require('./moduledt');

http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'text/html'});
    res.write(dt.myDateTime());
    res.write(dt.sumIntegers('2','8'));
    res.end();
}).listen(8080)