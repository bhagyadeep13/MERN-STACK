const Home = require("../models/home");
const fs = require('fs');
const User = require('../models/user')

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
    editing: false,
    IsLoggedIn : req.session.IsLoggedIn,
      user: req.session.user
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";

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
      IsLoggedIn : req.session.IsLoggedIn,
      user: req.session.user
    });
  });
};

exports.getHostHomes = async (req, res, next) => {
      const userId = req.session.user._id;
      const user = await User.findById(userId)
      .populate('homes')
      res.render("host/host-home-list", {
      registeredHomes: user.homes,
      pageTitle: "Host Homes List",
      currentPage: "host-homes", 
      IsLoggedIn : req.session.IsLoggedIn,
      user: req.session.user
    });
  };

exports.postAddHome = async (req, res, next) => {
  const { houseName, price, location, rating, photo, description,} = req.body;
    if(!req.file) // Check if a file was uploaded
    {
      return res.status(400).send("Only image files are allowed.");
      // You can also render an error page or redirect to an error route
    }

  const photo_path = req.file.path; // Get the filename from the uploaded file
  const home = new Home({
    houseName,
    price,
    location,
    rating,
    photo: photo_path, // Use the path of the uploaded
    description,
  });
  console.log(home)
  await home.save()
    console.log("Home Saved successfully");
    const userId2 = req.session.user._id; // Add created by field (user id) to home
    console.log(userId2);
    const homeId = home._id; // Use the _id of the newly created home
    const user = await User.findById(userId2);
    console.log("User: ", user, userId2); // Fetch user print only values of user
    if (!user.homes.includes(homeId)) {
        user.homes.push(homeId);
        await user.save();
    }
  res.redirect("/host/host-home-list");
};

exports.postEditHome = async (req, res, next) => {
  const { id, houseName, price, location, rating, photo, description } =
    req.body;
    const home = await Home.findById(id);
  if (home) {
    home.houseName = houseName;
    home.price = price;
    home.location = location;
    home.rating = rating;
    if(req.file) // Check if a new file was uploaded
    {
        fs.unlink(home.photo, (err) => {
          if (err) {
            console.error("Error deleting old photo:", err);
          }
        });
      home.photo = req.file.path; // Update the photo with the new file
    }
    home.description = description;
    await home.save();
    console.log("Home updated succesfully"); 
  }
  else
  {
    console.log("Home not found for editing.");
    res.redirect("/host/host-home-list");
  }
    res.redirect("/host/host-home-list");
  }
exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("Came to delete ", homeId);
  Home.findByIdAndDelete(homeId)
    .then(() => {
      res.redirect("/host/host-home-list");
    })
    .catch((error) => {
      console.log("Error while deleting ", error);
    });
};
