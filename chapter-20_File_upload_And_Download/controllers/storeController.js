const User = require("../models/user");
const Home = require("../models/home");
const e = require("express");
const { HostAddress } = require("mongodb");

exports.getIndex = (req, res, next) => {
  //console.log("session value",req.session)
  Home.find().then((registeredHomes) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "index", 
      IsLoggedIn : req.session.IsLoggedIn,
      user: req.session.user
    });
  });
};

exports.getViewDetails = async (req, res, next) => 
  {
    const homeId = req.query.homeId;
    const home = await Home.findById(homeId); // Fetch the home details by ID
    const host = await User.findById(home.host); // Fetch the host details by ID
    if (!home) {
      console.log("Home not found");
      return res.redirect("/homes");
    }
    const IsLoggedIn = req.session.IsLoggedIn; // Check if the user is logged in

    if(!IsLoggedIn)
    {
      console.log("User not logged in");
      return res.redirect("/login");
    }

    res.render("store/home-detail", {
      home: home,
      pageTitle: "View Home Details",
      currentPage: "viewDetails",
      firstName: host.firstName ? host.firstName : '',
      lastName: host.lastName ? host.lastName : '',
      email: host.email ? host.email : '',
      IsLoggedIn : req.session.IsLoggedIn,
      user: req.session.user
    });
  };

exports.getHomes = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Homes List",
      currentPage: "Home", 
      IsLoggedIn : req.session.IsLoggedIn,
      user: req.session.user
    });
  });
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings", 
      IsLoggedIn : req.session.IsLoggedIn,
      user: req.session.user
  });
};

exports.getFavouriteList = async (req, res, next) => {
  const userId = req.session.user._id; // user ID is stored in session
  const user = await User.findById(userId)
  .populate('favourites')

  res.render("store/favourite-list", {
    favouriteHomes: user.favourites,
    pageTitle: "Favourite Homes",
    currentPage: "favourites", 
    IsLoggedIn : req.session.IsLoggedIn,
    user: req.session.user
})
}

exports.postAddToFavourite = async (req, res, next) => {
  const userId = req.session.user._id; // user ID is stored in session
  console.log(userId);
  const homeId = req.body._id; // home ID from the request parameters
  const user = await User.findById(userId);
    console.log("User: ",await user,userId); // Fetch user print only values of user
     if (!user.favourites.includes(homeId)) {
      user.favourites.push(homeId);
      await user.save();
    }
    res.redirect("/favourites");
};

exports.postRemoveFromFavourite = async (req, res, next) => {
  const userId = req.session.user._id; // user ID is stored in session
  const homeId = req.params._id; // home ID from the request parameters
  const user = await User.findById(userId);
  console.log("User: ",await user,userId); // Fetch user print only values of user
  if(user.favourites.includes(homeId)) {
    user.favourites = user.favourites.filter((fav) => fav.toString() !== homeId.toString()
    );
    // Remove the homeId from favourites --> By filltering out the homeId we want to remove
  }
  await user.save();
  res.redirect("/favourites");
}

exports.getHomeDetails = async (req, res, next) => {
  const user = req.session.user; // user ID is stored in session
  if (!user) {
    console.log("User not logged in");
    return res.redirect("/login");
  }
  const {firstName, lastName, email} = user;
  const homeId = req.params.homeId;

  const home = await Home.findById(homeId); // Populate photos field if needed
  console.log("Home ID: ", home); // Log the home ID
    if (!home) {
      console.log("Home not found");
      res.redirect("/homes");
    } 
    else {
      res.render("store/home-detail", {
        home: home,
        firstName: firstName,
        lastName: lastName,
        email: email,
        pageTitle: "Home Detail",
        currentPage: "Home", 
        IsLoggedIn : req.session.IsLoggedIn,
        user: req.session.user
      });
    }
  }

  exports.getSearchResults = async (req, res, next) => {

    const searchQuery = req.query.search;

    console.log("Search Query: ", searchQuery);
  
    // Find homes that whose address contain searchQuery
    const homes = await Home.find({
      $or: [
        { propertyType: searchQuery },
        { "address.city": searchQuery },
        { "address.state": searchQuery },
        { "address.country": searchQuery },
      ]
    });
    if(homes)
    {
      res.render("store/home-list", {
        registeredHomes: homes,
        pageTitle: "Search Results",
        currentPage: "search",
        IsLoggedIn : req.session.IsLoggedIn,
        user: req.session.user
      });
    }
    else
    {
      res.render("store/home-list", {
        registeredHomes: [],
        pageTitle: "Search Results",
        currentPage: "search",
        IsLoggedIn : req.session.IsLoggedIn,
        user: req.session.user
      });
    }
  }
