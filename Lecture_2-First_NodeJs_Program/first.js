const fs = require('fs')

fs.writeFile("output.txt","My name is Bhagyadeep",(err)=>{
  if(err) console.log("Error occurred")
    else console.log("File created successfully");
})