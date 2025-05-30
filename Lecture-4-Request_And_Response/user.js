const http = require('http')

/*function requestListerner(req,res)
{
    console.log(req);
}*/

const fs = require('fs');

const server = http.createServer((req,res)=>{ // req - request
  console.log(req.url,req.method,req.headers);  // res - response

  if(req.url === '/') // sending request to server
  {
  res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Complete Coding</title></head>');
    res.write('<body><h1>Enter Your Details:</h1>');
    res.write('<form action="/submit-details" method="POST">'); // location where we have to go 
    res.write('<input type="text" name="username" placeholder="Enter your name"><br>');  

    // hame har input ke sath "name" attach karna padhta h 
    // jese input(text) -- > username
    // input(radio) --> gender

    res.write('<label for="male">Male</label>')
    res.write('<input type="radio" name="gender" value="male" />')
    res.write('<label for="female">Female</label>')
    res.write('<input type="radio" name="gender" value="female" />')
    res.write('<br><input type="submit" value="Submit">');
    res.write('</form>');
    res.write('</body>');
    res.write('</html>');
    return res.end();
  }
  else if(req.url.toLowerCase() === "/submit-details" && req.method==="POST")
  {                                                                                                                                        // response from server
      fs.writeFileSync("user.txt","My name is Bhagyadeep Mahawar")
      res.statusCode=302;
      res.setHeader('Location','/');
      return res.end();
  }
  /*process.exit() --> It is used to take exit from the server*/  
})

const PORT = 3001;
server.listen(PORT,()=>{
  console.log(`Your server is running at http://localhost:${PORT}/`)
});