const http = require('http')
const fs = require('fs')

const server = http.createServer((req,res)=>{
  console.log(req.url,req.method,req.headers);
  if(req.url==='/')
  {
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Complete Coding</title></head>');
  res.write('<body><h1>Like / Share / Subscribe</h1>');
  res.write(`<nav>
      <a href="/home" method="POST">HOME</a>
      <a href="/men">MEN</a>
      <a href="/women">WOMEN</a>
      <a href="/kids">KIDS</a>
      <a href="/cart">CART</a>
    </nav>`);
  res.write('</body>');
  res.write('</html>');
  return res.end();
  }
  else if(req.url==='/home')
  {
    res.write("<h1>welcome to Home</h1>")
    return res.end();
  }
  else if(req.url==='/men')
  {
    res.write("<h1>welcome to Men</h1>")
    return res.end();
  }
  else if(req.url==='/women')
  {
    res.write("<h1>welcome to Women</h1>")
    return res.end();
  }
  else if(req.url==='/kids')
  {
    res.write("<h1>welcome to Kids</h1>")
    return res.end();
  }
  else if(req.url==='/cart')
  {
    res.write("<h1>welcome to Cart</h1>")
    return res.end();
  }
})

const PORT = 3002;
server.listen(PORT,()=>{
  console.log(`Server is running at http://localhost:${PORT}/`)
})