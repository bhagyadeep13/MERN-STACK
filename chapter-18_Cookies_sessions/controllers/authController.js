
exports.getLogIn = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login Page",
    currentPage: "Login",
    IsLoggedIn: false
})
};

exports.postLogIn = (req, res, next) => {
  console.log(req.body)
  req.session.IsLoggedIn = true;
  //res.cookie("IsLoggedIn",true);  // cookies res ke sath jayegi or client ke server
  //req.IsLoggedIn = true;          // me store ho jayegi 
  res.redirect("/") // (get method with index page) ki request gayi localhost ko with cookie == "IsLoggedIn",true on browser
};

exports.postLogOut = (req, res, next) => {
  //res.cookie("IsLoggedIn",false);
  res.redirect('/login')
};


// session - server ke pass store hota h (internal cokkie banake)
// cookie - client ke pass store hota h (not use easily accessable)