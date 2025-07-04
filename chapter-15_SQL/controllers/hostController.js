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

  Home.findById(homeId).then(([homes]) => {
    const home = homes[0];
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
  Home.fetchAll().then(([registeredHomes,fields])=>{
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
  const home = new Home(houseName, price, location, rating, photoUrl,description);
  home.save();
  res.redirect("/host/host-home-list");
};

exports.postEditHome = (req, res, next) => {
  const {houseName, price, location, rating, photoUrl,description,id} = req.body;
  const home = new Home(houseName, price, location, rating, photoUrl,description,id);
  home.save();
  res.redirect("/host/host-home-list");
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log('Came to delete ', homeId);
  Home.deleteById(homeId).then( () => {
    res.redirect("/host/host-home-list");
  }).catch(err=>{
    console.log("error is occurs")
  })
};