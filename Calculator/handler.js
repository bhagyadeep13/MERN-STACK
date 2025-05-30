const fs = require('fs')

const sumRequestHandler = require('./sum')

function userRequesthandler(req,res){
  console.log(req.url,req.method);

  if(req.url === '/')
  {
    res.write(`
      <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Calculator</title>
</head>
<body>
    <h1>Welcome to Home</h1>
    <a href="/calculator">Calculator</a>
</body>
</html>`);

    return res.end();
  }
  else if(req.url === '/calculator')
  {
    res.write(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Calculator</title>
</head>
<body>
    <form action="/calculator-result" method="POST">
      <input type="number" name="first" placeholder="Enter first number">
      <input type="number" name="second" placeholder="Enter second number">
      <input type="submit" value="Sum">
    </form>
</body>
</html>
      `)
      return res.end()

  }
  else if(req.url === '/calculator-result' && req.method==='POST')
  {
      sumRequestHandler(req,res);
  }

  res.setHeader('Context-Type','text/html');
  res.write(`
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Calculator</title>
  </head>
  <body>
    <h1>404 error This page do not exist</h1>
  </body>
</html>
`)

res.end()
}

module.exports = userRequesthandler;