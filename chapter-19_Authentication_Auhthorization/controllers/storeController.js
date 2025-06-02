const User = require("../models/user");
const Home = require("../models/home");

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
  //console.log("User: ",await user); // Fetch user print only values of user
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
  console.log(req.body._id);
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
  if(user.favourites.includes(homeId)) {
    user.favourites = user.favourites.filter((fav) => fav.toString() !== homeId.toString()
    );
    // Remove the homeId from favourites --> By filltering out the homeId we want to remove
  }
  await user.save();
  res.redirect("/favourites");
}

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log("Home not found");
      res.redirect("/homes");
    } else {
      res.render("store/home-detail", {
        home: home,
        pageTitle: "Home Detail",
        currentPage: "Home", 
        IsLoggedIn : req.session.IsLoggedIn,
      user: req.session.user
      });
    }
  });
};
