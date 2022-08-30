module.exports = app => {
    const User = require("../controllers/user.controller");
    var router = require("express").Router();
    // Create a new user
    router.post("/", User.saveAll);
    // Retrieve all users
    router.get("/users", User.getAllByUser);
    // Retrieve all users by name
    router.get("/", User.getUserByName);
   
    app.use('/api/tutorials', router);
  };