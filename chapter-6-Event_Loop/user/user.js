const http = require('http')

/*function requestListerner(req,res)
{
    console.log(req);
}*/

const fs = require('fs');

function userRequesthandler(req,res){ // req - request
  console.log(req.url,req.method);  // res - response

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
  {         
      const body=[];                               
      req.on('data',(chunk)=>{
        console.log(chunk);
        body.push(chunk);
      })
  
      req.on('end',()=>{
        const fullBody = Buffer.concat(body).toString();
        console.log(fullBody);

        const params = new URLSearchParams(fullBody)
        //params is an iterable of key-value pairs (like [["name", "John"], ["age", "25"]]).
        // URLSearchParams parses this string into a key-value map of parameters.

        /*const bodyObject={};
        for(const [key,value] of params.entries())
        {
          bodyObject[key] = value;
        }*/

        const bodyObject = Object.fromEntries(params);
        // Object.fromEntries() converts that iterable into a JavaScript object:

        console.log(bodyObject);
        fs.writeFile("user.txt",JSON.stringify(bodyObject),(error)=>{
          console.log('Data written successfully');
          res.statusCode = 302;
          res.setHeader('Location', '/');
          return res.end();
        });
      })
  }
  /*process.exit() --> It is used to take exit from the server*/  
}

module.exports = userRequesthandler;
