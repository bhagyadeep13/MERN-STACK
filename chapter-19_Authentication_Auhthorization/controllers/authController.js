const { check, validationResult } = require("express-validator");

const User = require("../models/user");
const bcrypt = require("bcryptjs");
const user = require("../models/user");

exports.getLogIn = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login Page",
    currentPage: "Login",
    IsLoggedIn: false,
    error: [],
    oldInput: {
      email: '',
      password: ''
    },
    user: {}
})
};

exports.postLogIn = async (req, res, next) => {
  console.log(req.body)
  const { email, password } = req.body;
  console.log(email, password)
  const User = await user.findOne({ email: email })
  {
    if (!User) {
      return res.status(401).render("auth/login", {
        pageTitle: "Login Page",
        currentPage: "Login",
        IsLoggedIn: false,
        error: ["Invalid email or password"],
        oldInput: {
          email: email,
          password: password
        },
        user: {}
      });
    }
    else{
      const doMatch = await bcrypt.compare(password, User.password)
    if (!doMatch) {
      return res.status(401).render("auth/login", {
        pageTitle: "Login Page",
        currentPage: "Login",
        IsLoggedIn: false,
        error: ["Invalid password"],
        oldInput: {
          email: email,
          password: password
        },
        user: {}
      });
    }
    else
    {
      console.log("User logged in successfully");
      req.session.IsLoggedIn = true;
      req.session.user = User; // Store the user in the session
      await req.session.save();
      res.redirect("/") 
    }
  }
}
};
  //res.cookie("IsLoggedIn",true);  // cookies res ke sath jayegi or client ke server
  //req.session.IsLoggedIn = true;          // me store ho jayegi 
  // get method with index page) ki request gayi localhost ko with cookie == "IsLoggedIn",true on browser

exports.postLogOut = (req, res, next) => {
  //res.cookie("IsLoggedIn",false);
  req.session.destroy(() => {
    res.redirect('/login')
  });
};


exports.getSignUp = (req, res, next) => {
  res.render("auth/signup", {
    pageTitle: "Sign Page",
    currentPage: "signup",
    IsLoggedIn: false,
    error: [],
    oldInput: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      userType: ''
    }
})
};

exports.postSignUp = [
  check('firstName')
  .trim()
  .isLength({ min: 2 })  // minimum length of 2 characters
  .withMessage('First name is atleast 2 characters long')
  .matches(/^[A-Za-z]+$/) // matches only alphabetical characters
  .withMessage('First name must contain only contains Alphabetical characters'),
  // + --> minimum 1 character
  // * --> 0 or more characters

  check('lastName')
  .matches(/^[A-Za-z]*$/) // matches only alphabetical characters
  .withMessage('Last name must contain only contains Alphabetical characters'),

  check('email')
  .isEmail()
  .withMessage('Please enter a valid email address')
  .normalizeEmail() ,// normalize the email address,

  check('password')
  .isLength({ min: 8 }) // minimum length of 6 characters
  .withMessage('Password must be atleast 8 characters long')
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
  .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
  .trim(), // remove leading and trailing spaces

  check('userType')
  .notEmpty() // ensure the field is not empty
  .withMessage('User type is required')
  .isIn(['host', 'guest']) // check if the value is either 'host' or 'guest'
  .withMessage('User type must be either host or guest')
  .notEmpty(),// ensure the field is not empty

   check("confirmPassword")
  .trim()
  .custom((value, {req}) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),

  check("terms")
  .custom((value, {req}) => {
    if (value !== "on") {
      throw new Error("Please accept the terms and conditions");
    }
    return true;
  }),

  (req, res, next) => {
    const {firstName, lastName, email, password, userType} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {   // if there are validation errors
      return res.status(422).render("auth/signup", {
        pageTitle: "Sign Up Page",
        currentPage: "signup",
        IsLoggedIn: false,
        error: errors.array().map(err => err.msg),
        oldInput: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          userType: userType
        },
        user: {}
      });
    }
    const user = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      userType: userType
    });
    user.save()
      .then(() => {
        console.log("User registered successfully");
        bcrypt.hash(password, 12) // Hash the password with a salt rounds of 12
          .then(hashedPassword => {
            user.password = hashedPassword; // Store the hashed password
            return user.save(); // Save the user with the hashed password
          })
          .catch(err => {
        console.error("Error while registering user: ", err);
        res.status(500).render("auth/signup", {
          pageTitle: "Sign Up Page",
          currentPage: "signup",
          IsLoggedIn: false,
          error: [err],
          oldInput: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            userType: userType
          },
          user: {}
        });
      });
      res.redirect("/login");
      })
  }
];

// session - server ke pass store hota h (internal cokkie banake)
// cookie - client ke pass store hota h (not use easily accessable)