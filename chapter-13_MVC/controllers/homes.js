const Home = require("../models/home")

exports.getAddHome = (req, res, next) => {
  res.render('host/addHome', {pageTitle: 'Add Home to airbnb'});
}

exports.AddHome = (req, res, next) => {
  console.log('Home Registration successful for:', req.body);
  const {houseName,price,location,rating,url} = req.body;
  const home = new Home(houseName,price,location,rating,url);
  home.save();
  res.render("host/home-Added", {pageTitle: 'Home Added Successfully'});
}

exports.getHomes = (req, res, next) => {
    // pehle fetchAll function me callback pass kiya
    // fetchAll --> 1) read the existing data 
                //  2) then call the function it will get as a argument
    Home.fetchAll(function(registeredHomes){
    res.render('store/home-list', {registeredHomes: registeredHomes, pageTitle: 'airbnb Home'})});
}

exports.getBookings = (req, res, next) => {
    Home.fetchAll(registeredHomes=>
    res.render('store/bookings', {registeredHomes: registeredHomes, pageTitle: 'Bookings'}));
}

exports.index = (req, res, next) => {
    Home.fetchAll(registeredHomes=>
    res.render('store/index', {registeredHomes: registeredHomes, pageTitle: 'Index page'}));
}

exports.getFavouriteList = (req, res, next) => {
    Home.fetchAll(registeredHomes=>
    res.render('store/favourites', {registeredHomes: registeredHomes, pageTitle: 'Bookings'}));
}

exports.postFavourite = (req, res, next) => {
    console.log(req.body,req.method)
    res.redirect('/favourites')
}

exports.getHostList = (req, res, next) => {  
  // 
    Home.fetchAll(registeredHomes=>
    res.render('host/host-home-list', {registeredHomes: registeredHomes, pageTitle: 'Host List'}));
}

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
    Home.findById(homeId,function(home)
    { 
      if(!home)
      {
        console.log('Home not found')
        res.redirect('/homes')
      }
      else
      {
      res.render('store/home_detail', (home)=
        {
          home : home,
          pageTitle: 'Home'})
        }
    });
  }