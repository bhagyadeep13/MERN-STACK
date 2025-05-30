const http = require('http')

const server = http.createServer((req,res)=>{
  console.log(req);
  if(req.url === '/')
  {
    res.write(
`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Calculator</title>
</head>
<body>
    <form action="/calculator-result" method="POST">
      <h1>Bhagyadeep Mahawar</h1>
    </form>
</body>
</html>
      `)
      return res.end();
  }
});

const PORT = 3002;
server.listen(PORT,()=>{
  console.log(`Your server is running at http://localhost:${PORT}/`)
});