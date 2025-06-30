const Home = require("../models/home");
const fs = require('fs');
const User = require('../models/user')

exports.getAddHome = (req, res, next) => {
  res.render("host/details", {
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

    res.render("host/details", {
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

      console.log("User: ", user.homes); // Fetch user print only values of user
      res.render("host/host-home-list", {
      registeredHomes: user.homes,
      pageTitle: "Host Homes List",
      currentPage: "host-homes", 
      IsLoggedIn : req.session.IsLoggedIn,
      user: req.session.user
    });
  };

exports.postAddHome = async (req, res, next) => {
    const {
      propertyType,
      addressStreet,
      addressCity,
      addressState,
      addressZip,
      addressCountry,
      numberOfRooms,
      guestCapacity,
      description,
      amenities,
      pricePerNight,
      availableFrom,
      availableTo
    } = req.body;

    console.log("Request body: ", req.file.filename);

    if (!req.file) {
      return res.status(400).send('No files uploaded.');
    }

    const photo_path = req.file.filename // Store all uploaded photo paths
    const userId = req.session.user._id;

    const home = new Home({
      propertyType,
      address: {
        street: addressStreet,
        city: addressCity,
        state: addressState,
        zip: addressZip,
        country: addressCountry
      },
      numberOfRooms,
      guestCapacity,
      description,
      amenities: amenities.split(',').map(a => a.trim()),
      pricePerNight,
      availableFrom: availableFrom ? new Date(availableFrom) : null,
      availableTo: availableTo ? new Date(availableTo) : null,
      photo: photo_path,
      host: req.session.user._id // Assuming the user ID is stored in session
    });

    await home.save();
    console.log("Home saved successfully");

    const homeId = home._id;
    const user = await User.findById(userId);

    if (!user.homes.includes(homeId)) {
      user.homes.push(homeId);
      await user.save();
      req.session.user.homes.push(homeId);  // OR re-fetch the whole user
      req.session.save(); // Optional but ensures session is saved before redirect
    }
    res.redirect("/host/host-home-list");
  } 

exports.postEditHome = async (req, res, next) => {
  const { 
      propertyType,
      addressStreet,
      addressCity,
      addressState,
      addressZip,
      addressCountry,
      numberOfRooms,
      guestCapacity,
      description,
      amenities,
      pricePerNight,
      availableFrom,
      availableTo
  } =
    req.body;;

    const id = req.body.homeId;
    const home = await Home.findById(id);
  if (home) {
    home.propertyType = propertyType;
    home.address.street = addressStreet;
    home.address.city =  addressCity;
    home.address.state = addressState;
    home.address.zip = addressZip;
    home.address.country = addressCountry;
    home.numberOfRooms = numberOfRooms;
    home.guestCapacity = guestCapacity;
    home.description = description;
    home.amenities = amenities.split(',').map(a => a.trim());
    home.availableFrom = availableFrom ? new Date(availableFrom) : null;
    home.availableTo = availableTo ? new Date(availableTo) : null;
    home.pricePerNight = pricePerNight;
    home.photo = req.file ? req.file.filename : home.photo; 
    home.description = description;
    home.host = req.session.user._id; // Assuming the user ID is stored in session
    await home.save();
    console.log("Home updated succesfully"); 
  }
  else
  {
    console.log("Home not found for editing.");
  }
    res.redirect("/host/host-home-list");
  }

exports.postDeleteHome = async (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("Came to delete ", homeId);
  await  Home.findByIdAndDelete(homeId);
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if (user) {
    user.homes = user.homes.filter((home) => home.toString() !== homeId.toString());
    await user.save();
    }
  console.log("Home deleted successfully");
  res.redirect("/host/host-home-list");
};

exports.addDetails = async (req,res,next)=>{
  console.log("hello");
  res.render('host/details',{
    pageTitle: "DetailsPage",
    currentPage: "detailPage",
    IsLoggedIn: req.session.IsLoggedIn,
    user: req.session.user,
  });
}
