// External Module
const express = require("express");
const authRouter = express.Router();

// Local Module
const authController = require("../controllers/authController");

authRouter.get("/login", authController.getLogIn);
authRouter.post("/login", authController.postLogIn);
authRouter.post("/logout", authController.postLogOut);

module.exports = authRouter;
