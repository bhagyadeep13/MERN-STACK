function logical()
{
  let x= 5;
  if(x=10) // Here the value 10 is assigned to x (in javascript) instead use '==='
  {
    console.log(x)
  }
  else
  {
    console.log("num is not 10")
  }
}

module.exports = logical;