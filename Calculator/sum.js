function sumRequestHandler(req,res){
  
  console.log(req.url,req.method)

  let result;
      const body=[];                               
      req.on('data',(chunk)=>{
        console.log(chunk);
        body.push(chunk);
      })
  
      req.on('end',()=>{
        const fullBody = Buffer.concat(body).toString();
        console.log(fullBody);

        const params = new URLSearchParams(fullBody)

        const bodyObject = Object.fromEntries(params);
        result = Number(bodyObject.first) + Number(bodyObject.second);

        console.log(result);

        res.write(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Calculator</title>
</head>
<body>
    <h1>Sum of the two numbers is:${result}<h1>
</body>
</html>
      `)
      return res.end()
      });
}

module.exports = sumRequestHandler;