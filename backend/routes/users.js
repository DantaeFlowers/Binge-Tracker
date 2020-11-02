const express = require("express");
const router = express.Router();
const usersQueries = require("../queries/users");
const db = require("../db/db");

/* Route to GET all users listing. */
router.get("/", loginRequired, async (req, res, next) => {
   console.log('session req', req.session)
  try {
  const requestQuery = `SELECT * FROM users`
  let allUsers = await db.any(requestQuery);
  console.log("users", allUsers);
  
    res.json({
      payload: allUsers,
      message: `Users request was successfully received`,
      error: false
    });
  } catch (error) {
    res.status(500);
    res.json({
      message: `Unable to retrieve users`,
      error: true
    });
    console.log("error", error);
  }
});

// Route to GET users by ID.
router.get("/:id", async (req, res, next) => {
  
  const params = req.params.id
  try {
    const user = await usersQueries.getUserById(params);
    res.json({
      payload: user,
      message: `User was successfully retrieved`,
      error: false
    });
  } catch (error) {
    res.status(500);
    res.json({
      message: `Unable to retrieve user`,
      error: true
    });
    console.log("err", error);
  }
});

router.get("/user/:username", async (req, res, next) => {
  const username = req.params.username

  console.log('What Name is this', username)
  try {
   
    const user = await usersQueries.getByUsername(username);
  
    res.json({
      payload: user,
      message: `User was successfully retrieved`,
      error: false
    });
  } catch (error) {
    console.log('error', error)
    res.status(500);
    res.json({
      message: `Unable to retrieve user`,
      error: true
    });
  
  }
});

module.exports = router;