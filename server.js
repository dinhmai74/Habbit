const http = require('http');

http.createServer((req,res)=>{
  res.write('heelo')
  res.end()
}).listen(8080)
