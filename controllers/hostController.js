const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
    editing: false,
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === 'true';

  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log("Home not found for editing.");
      return res.redirect("/host/host-home-list");
    }

    console.log(homeId, editing, home);
    res.render("host/edit-home", {
      home: home,
      pageTitle: "Edit your Home",
      currentPage: "host-homes",
      editing: editing,
    });
  });
};

exports.getHostHomes = (req, res, next) => {
  Home.find().then(registeredHomes=>{
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Homes List",
      currentPage: "host-homes",
    })
});
};

exports.postAddHome = (req, res, next) => {
  console.log(req.body)
  const {houseName, price, location, rating, photoUrl ,description} = req.body;
  const home = new Home({houseName, price, location, rating, photoUrl,description});
  home.save().then(()=>{
    console.log("Home added successfully")
  });
  res.redirect("/host/host-home-list");
};

exports.postEditHome = (req, res, next) => {
  const { houseName, price, location, rating, photoUrl, description, _id } = req.body;

  if (!_id) {
    return res.status(400).send("Missing _id for editing home.");
  }
  Home.findById(_id).then((home) => {
      if (!home) {
        console.log("No home found with the given ID:", _id);
        return res.status(404).send("Home not found");
      }
      home.houseName = houseName;
      home.price = price;
      home.location = location;
      home.rating = rating;
      home.photoUrl = photoUrl;
      home.description = description;
      home.save().then(()=>{
          console.log("Home updated successfully:", home);
          res.redirect("/host/host-home-list");
      })
    .catch((err) => {
      console.error("Error updating home:", err);
      res.status(500).send("Internal Server Error");
    });
})
}

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log('Came to delete ', homeId);
  Home.findByIdAndDelete(homeId).then( () => {
    res.redirect("/host/host-home-list");
  }).catch(err=>{
    console.log("error is occurs")
  })
};