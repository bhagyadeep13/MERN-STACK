// Core Modules
const db = require('../utils/databaseUtils')

module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl,description,id) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description=description;
    this.id=id;
  }

   save() {
    if (this.id)
    {
      return db.execute('UPDATE homes SET houseName=?, price=?, location=?, rating=?, photoUrl=?, description=? WHERE id=?', [this.houseName, this.price, this.location, this.rating, this.photoUrl, this.description, this.id]);

    } else { // insert
      return db.execute(`INSERT INTO homes (houseName, price, location, rating, photoUrl, description) VALUES (?,?,?,?,?,?)`, [this.houseName, this.price, this.location, this.rating, this.photoUrl, this.description]);
  }
}

  static fetchAll() {
    return db.execute('SELECT * from homes');
    // returns a promise that resolves to an array with two elements when using the mysql2 library with .promise().
  }

  static findById(homeId) 
  {
    return db.execute('SELECT * FROM homes where id=?',[homeId]);
  }

  static deleteById(homeId) 
  {
    return db.execute('DELETE FROM homes where id=?',[homeId]);
  }
};
