// Core Modules
const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");

module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }

  save() {
    this.id = Math.random();
    Home.fetchAll((registeredHomes) => {
      console.log(this);
      registeredHomes.push(this);
      const homeDataPath = path.join(rootDir, "data", "homes.json");
      fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), (error) => {
        console.log("File Writing Concluded", error);
      });
    });
  }

  static fetchAll(callback) {
    const homeDataPath = path.join(rootDir, "data", "homes.json");
    fs.readFile(homeDataPath, function(err, data){
      callback(!err ? JSON.parse(data) : []); // homes data is passed in 
    });                                       // in callback
  }

  static findById(homeId,callback)
  {
    Home.fetchAll(function(homes)
    {
      const homeFound = homes.find(home => home.id == homeId); // home.id - integer // homeId - string   we use (==)
      callback(homeFound);
    });
  }
}